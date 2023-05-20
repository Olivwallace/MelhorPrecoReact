package Service;

import spark.Request;
import spark.Response;


import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletException;
import javax.servlet.http.Part;
import java.io.*;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;

public class NotaService {


    public String uploadNota(Request request, Response response) throws ServletException, IOException {
        String location = "MelhorPrecoApp"; // the directory location where files will be stored
        long maxFileSize = 100000000;       // the maximum size allowed for uploaded files
        long maxRequestSize = 100000000;    // the maximum size allowed for multipart/form-data requests
        int fileSizeThreshold = 1024;       // the size threshold after which files will be written to disk

        MultipartConfigElement multipartConfigElement = new MultipartConfigElement(location, maxFileSize, maxRequestSize, fileSizeThreshold);
        request.raw().setAttribute("org.eclipse.jetty.multipartConfig", multipartConfigElement);
        Collection<Part> parts = request.raw().getParts();
        String path = Paths.get("").toAbsolutePath() + "/src/main/resources/tmp/";
        File  existente;
        for (Part part : parts) {
            String fName = part.getSubmittedFileName();
            existente = new File(path+fName);
           if(!existente.exists()){
               Path out = Paths.get(path + fName);
               try (final InputStream in = part.getInputStream()) {
                   Files.copy(in, out);
                   part.delete();
               }
           }
        }
        // cleanup
        multipartConfigElement = null;
        parts = null;
        return "OK";
    }
}

