package Service;

import org.opencv.core.*;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.CLAHE;
import org.opencv.imgproc.Imgproc;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class QRcode {


    /**
     * Método de conversão da imagem para tons de cinza
     * @param nomeArquivo nome do arquivo para modificação
     */
    public void convertGray(String nomeArquivo){
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
        //caminho do arquivo
        String path = "tmpImages/"+nomeArquivo;

        // Carregar a imagem em cores
        Mat image = Imgcodecs.imread(path);
            if (!image.empty()){
                Mat grayImage = new Mat();
                Mat finalImg = new Mat();
                // Converter para tons de cinza
                Imgproc.cvtColor(image, grayImage, Imgproc.COLOR_BGR2GRAY);
                //aplicando o histograma para melhorar a imagem
                CLAHE clahe = Imgproc.createCLAHE(1.0, new Size(8, 8));
                clahe.apply(grayImage,finalImg);
                // Salvar a imagem em tons de cinza
                Imgcodecs.imwrite(path, finalImg);
            }
    }
    public void recortaImg(String path){
        String a = "tmpImages/"+path;
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
        // Carregar a imagem em cores
        Mat image = Imgcodecs.imread(a);
        Mat grayImage = new Mat();
        Imgproc.cvtColor(image, grayImage, Imgproc.COLOR_BGR2GRAY);

// Aplique a detecção de contornos na imagem em escala de cinza
        List<MatOfPoint> contours = new ArrayList<>();
        Mat hierarchy = new Mat();
        Imgproc.findContours(grayImage, contours, hierarchy, Imgproc.RETR_EXTERNAL, Imgproc.CHAIN_APPROX_SIMPLE);

// Encontre o maior contorno com base em sua área
        double maxArea = -1;
        MatOfPoint largestContour = null;
        for (MatOfPoint contour : contours) {
            double area = Imgproc.contourArea(contour);
            if (area > maxArea) {
                maxArea = area;
                largestContour = contour;
            }
        }

// Obtenha o retângulo delimitador do maior contorno
        Rect boundingRect = Imgproc.boundingRect(largestContour);

// Recorte a imagem usando o retângulo delimitador
        Mat croppedImage = new Mat(image, boundingRect);
        Imgcodecs.imwrite(a, croppedImage);

    }
    public void bufferedImage(String nomeArquivo,String formato){
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
        Mat image = Imgcodecs.imread(("tmpImages/"+nomeArquivo));
        Mat grayImage = new Mat();
        Imgproc.cvtColor(image, grayImage, Imgproc.COLOR_BGR2GRAY);
        // Convertendo para um array de bytes
        MatOfByte matOfByte = new MatOfByte();
         Imgcodecs.imencode(formato, grayImage, matOfByte);
        byte[] byteArray = matOfByte.toArray();

        try {
            // Criando um objeto ByteArrayInputStream a partir do array de bytes
            InputStream in = new ByteArrayInputStream(byteArray);

            // Lendo o BufferedImage a partir do InputStream
            BufferedImage bufferedImage = ImageIO.read(in);

            // Salvando a imagem em tons de cinza
            String outputFilePath = "tmpImages/"+nomeArquivo;
            ImageIO.write(bufferedImage, formato, new File(outputFilePath));
            System.out.println("Imagem em tons de cinza salva com sucesso em: " + outputFilePath);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
