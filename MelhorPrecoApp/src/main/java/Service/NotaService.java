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
                    mercado(html);
                    produtos(html);
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
    public static void produtos(String result) {
        Document html = Jsoup.parse(result);
        Elements trElements = html.select("#myTable tr");
        Elements tdElements;

        for (Element trElement : trElements) {
            tdElements = trElement.select("td");
            Element td = tdElements.get(0);
            String tmp = td.toString().replaceAll("\n","");
            String nome = tmp.substring((tmp.indexOf("<h7>")+6),(tmp.indexOf("</h7>")));
            nome = nome.replaceAll("\\.", " ");
            String []vetPalavras = nome.split(" ");
            int palavras = (ehUnidade(vetPalavras[vetPalavras.length-1]))? vetPalavras.length-1: vetPalavras.length;
            Object [] nomeProduto = new Object[palavras];
            for (int i = 0; i < palavras; i++) {
                ArrayList<String> lista =  getPalavra(vetPalavras[i]);
                if(lista != null){
                    if(lista.size()==1){
                        nomeProduto[i] = lista.get(0);
                    } else if(lista.size()>1) {
                        nomeProduto[i] = lista;
                    }
                }else {
                    nomeProduto[i] = vetPalavras[i];
                }
            }
            String codigo = tmp.substring((tmp.indexOf(": ")+2),(tmp.indexOf(")")));
            td = tdElements.get(3);
            tmp = td.toString().replaceAll("\n","");
            String valor = tmp.substring(tmp.lastIndexOf("R$")+3,(tmp.indexOf("</td>")));
            System.out.println(Arrays.toString(nomeProduto) +"\t"+codigo+"\t"+valor);
        }
    }
    public static boolean ehUnidade(String s){
        boolean hasUn = false;
        String []unMedida = {"kg","ml","1","2","3","4","5","6","7","8","9","0"};
        int i = 0;
        while(i<unMedida.length&&(!hasUn)){
            if(s.contains(unMedida[i])){
                hasUn = true;
            }
            i++;
        }
        return hasUn;
    }

    public void mercado(String result){
        int inicio = result.indexOf("<table");
        int fim = result.indexOf("</table>");
        String tabela = result.substring(inicio,fim);
        String nomeMercado = tabela.substring((tabela.indexOf("<b>")+3),(tabela.indexOf("</b>")));
        String CNPJ = tabela.substring((tabela.indexOf("CNPJ")+5),(tabela.indexOf(" -, ")));
        String endereco = tabela.substring((tabela.indexOf("italic")+9),(tabela.lastIndexOf("</td>")));
        String []dadosEnd = endereco.split(", ");
        String rua = dadosEnd[0];
        int numero = Integer.parseInt(dadosEnd[1]);
        String cidade = dadosEnd[3].substring(dadosEnd[3].indexOf("-")+1);
        System.out.println(nomeMercado+"\t"+CNPJ+"\t"+rua+"\t"+numero+"\t"+cidade);
    }

}


