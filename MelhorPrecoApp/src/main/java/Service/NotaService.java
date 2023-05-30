package Service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
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
import java.util.Arrays;
import java.util.Collection;
import Connection.NotaURL;



public class NotaService extends QRcodeService {

    public NotaService(){
        initAbvMap();
    }

    public String uploadNota(Request request, Response response) throws ServletException, IOException {
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
                   String html =  url.getHtml(qrReader(nomeArquivo));
                    url.mercado(html);
                    url.produtos(html);
                }
                numero++;
                existente.delete();
            }

        }


        existente = null;
        multipartConfigElement = null;
        parts = null;
        return "OK";
    }

}


