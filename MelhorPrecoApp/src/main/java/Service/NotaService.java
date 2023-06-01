package Service;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import spark.Request;
import spark.Response;
import java.io.IOException;
import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletException;
import javax.servlet.http.Part;
import java.io.*;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collection;
import Connection.NotaURL;
import Model.Tmp;


public class NotaService extends QRcodeService {
    private ResponseService response;
    public NotaService(){
        initAbvMap();
    }

    public String uploadNota(Request request, Response resp) throws ServletException, IOException {
        String location = "MelhorPrecoApp";
        long maxFileSize = 100000000;       // O tamanho máximo permitido para os arquivos enviados
        long maxRequestSize = 100000000;    // O tamanho máximo permitido para as solicitações multipart/form-data
        int fileSizeThreshold = 1024;       //  O tamanho em que os arquivos serão gravados no disco

        MultipartConfigElement multipartConfigElement = new MultipartConfigElement(location, maxFileSize, maxRequestSize, fileSizeThreshold);
        request.raw().setAttribute("org.eclipse.jetty.multipartConfig", multipartConfigElement);
        Collection<Part> parts = request.raw().getParts();
        NotaURL url = new NotaURL();
        String path ="tmpImages/";
        File existente;
        int numero = 0;
        String[] mercado = null;
        ArrayList<Tmp> produtos = new ArrayList<>();
        String html,chaveAcesso = "";
        //Carregando cada imagem do formData e salvando na pasta
        for (Part part : parts) {
            String fName = part.getSubmittedFileName();
            int posicaoPonto = fName.lastIndexOf(".");
            //modificação do nome do arquivo devido aos caracteres especiais
            String nomeArquivo = numero+fName.substring(posicaoPonto);
            existente = new File(path + nomeArquivo);
            //verifica se essa imagem já existe
            if (!existente.exists()) {
                Path out = Paths.get(path + nomeArquivo);
                try (final InputStream in = part.getInputStream()) {
                    Files.copy(in, out);
                    part.delete();
                    binaryImg(nomeArquivo);
                    chaveAcesso = qrReader(nomeArquivo);
                    html =  url.getHtml(chaveAcesso);
                    chaveAcesso = chaveAcesso.substring(chaveAcesso.indexOf("=")+1,chaveAcesso.indexOf("|"));
                    mercado  =  url.mercado(html);
                    produtos =  url.produtos(html);
                }
                existente.delete();
            }
        }

        Gson gson = new Gson();
        JsonObject data = new JsonObject();
        JsonArray arrayList = new JsonArray();
        if (produtos.size() > 0) {
            for (Tmp tmp : produtos){
                arrayList.add(gson.toJsonTree(tmp));
            }
            data.add("ChaveAcesso", gson.toJsonTree(chaveAcesso));
            data.add("Mercado",gson.toJsonTree(mercado));
            data.add("Produtos", arrayList);
            response = new ResponseService(200, "SUCESS", data);
        } else {
            data.add("Produtos", arrayList);
            response = new ResponseService(409, "ERROR", data);
        }

        existente = null;
        multipartConfigElement = null;
        parts = null;
        return response.toJson();
    }

}


