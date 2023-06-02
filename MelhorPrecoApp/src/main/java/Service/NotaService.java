package Service;
import Dao.NotaDAO;
import Model.Nota;
import Utels.Arq;
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
import java.util.HashSet;
import java.util.List;

import Connection.NotaURL;
import Model.Tmp;


public class NotaService extends QRcodeService {
    private NotaDAO notaDAO = new NotaDAO();
    private ResponseService response;
    public NotaService() throws IOException {
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
        if(mercado!=null){
            String CNPJ = mercado[1].replaceAll(" ","");
            path = "abvString/"+CNPJ+".txt";
            System.out.println(path);
            File existe = new File(path);

            if(existe.exists()){
                Arq.openRead(path);
                List<String> file = new ArrayList<>();
                while (Arq.hasNext()){
                    String s = Arq.readLine();
                    file.add(s.replaceAll("\"",""));
                }
                Arq.close();
                for (Tmp t : produtos) {
                    for (String linha : file) {
                        if (linha.contains(t.abreviacao)) {
                            int pulo = (linha.charAt(linha.indexOf(",")+1)==' ')?2:1;
                            String[] palavras = linha.substring(linha.indexOf(",") + pulo).split("\\s+");
                            for (int j = 0; j < t.palavras.length; j++) {
                                t.palavras[j] = palavras[j];
                            }
                            break; // Se encontrou uma correspondência, pode interromper o loop
                        }
                    }

                }
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

    public String retornoNota(Request req,Response resp) throws IOException {
        resp.type("application/json");
        Gson gson = new Gson();
        JsonObject json = gson.fromJson(req.body(), JsonObject.class);
        //transformação de json em classe
        Nota nota = new Nota(json);
        List<Tmp> produtosNota = produtosDistintos(nota.getProdutos());
        String CNPJ = nota.getMercado()[1].replaceAll(" ","").replaceAll("\"","");
        String path = "abvString/"+CNPJ+".txt";
        File existe = new File(path);
        //verifica se o arquivo do mercado que tem as abreviações existe
        if(existe.exists()){
            Arq.openRead(path);
            List<String> file = new ArrayList<>();
            while (Arq.hasNext()){
                String s = Arq.readLine();
                file.add(s.substring(0,s.indexOf(",")));
            }
            Arq.close();
            Arq.openWrite(path,true);
            int i = 0;
            for (Tmp abv : produtosNota) {
                if (!file.contains(abv.abreviacao)) {
                    Arq.write(produtosNota.get(i).abreviacao+","+produtosNota.get(i).produto+"\n");
                }
                i++;
            }
            Arq.close();
        } else {
            Arq.openWrite(path,false);
            for (int i = 0; i < produtosNota.size(); i++) {
                Arq.write(produtosNota.get(i).abreviacao+","+produtosNota.get(i).produto+"\n");
            }
            Arq.close();
        }
        /*
        Aqui, essa variavel produtosNota tem uma lista de tmp com todos os produtos distintos
        então na hora de cadastrar dá pra usar ele, já que tem o nome do produto na varivel produto, tem o valor e a unMedida
        o mercado ta em nota mas é só usar nota.mercado[] na posicao 0 tem o nome do mercado, na posicao 1 tem o cnpj e o no 2 tem a rua com a cidade e estado
        e se der nota.chaveAcesso voce tem a chave de acesso da nota fiscal


        boolean create = notaDAO.envioNota(nota);
        JsonObject data = new JsonObject();
        if (create) {
            data.addProperty("Criada", true);
            response = new ResponseService(200, "SUCESS", data);
        } else {
            data.addProperty("Criada", false);
            response = new ResponseService(409, "ERROR", data);
        }*/

        return "ok";

    }

    public List<Tmp> produtosDistintos(ArrayList<Tmp> produtos) {
        HashSet<String> nomeProduto = new HashSet<>();
        List<Tmp> produtosUnicos = new ArrayList<>();
        for (Tmp temp : produtos) {
            if (nomeProduto.add(temp.produto)) {
                produtosUnicos.add(temp);
            }
        }
        return produtosUnicos;
    }


}


