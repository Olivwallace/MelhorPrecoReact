package Service;


import Utels.Contraction_Map;
import com.google.zxing.BinaryBitmap;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.NotFoundException;
import com.google.zxing.Result;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.HybridBinarizer;
import org.opencv.core.*;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.CLAHE;
import org.opencv.imgproc.Imgproc;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class QRcodeService extends Contraction_Map {

    public String qrReader(String nomeArquivo) {
        Result result;
        String caminho = "tmpImages/" + nomeArquivo ;
        try {
            BufferedImage bf = ImageIO.read(new FileInputStream(caminho));
            BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(new BufferedImageLuminanceSource(bf)));
            result = new MultiFormatReader().decode(bitmap);
        } catch (NotFoundException | IOException e) {
            throw new RuntimeException(e);
        }

        return result.getText();
    }
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
    public void binaryImg(String nomeArquivo){

        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
        String path = "tmpImages/"+nomeArquivo;

        // Carregar a imagem em cores
        Mat image = Imgcodecs.imread(path);
        Mat grayImage = new Mat();
        Imgproc.cvtColor(image, grayImage, Imgproc.COLOR_BGR2GRAY);

        // Aplicar o threshold
        double thresholdValue = 127; // Valor limite
        double maxBinaryValue = 255; // Valor máximo para pixels binários
        int thresholdType = Imgproc.THRESH_BINARY; // Tipo de threshold (binário neste exemplo)
        Imgproc.threshold(grayImage, grayImage, thresholdValue, maxBinaryValue, thresholdType);

        // Salvar a imagem com o threshold aplicado
        Imgcodecs.imwrite(path, grayImage);

    }
    public void contrasteImg(String nomeArquivo){

        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
        String path = "tmpImages/"+nomeArquivo;

        // Carregar a imagem em cores
        Mat image = Imgcodecs.imread(path);
        Mat grayImage = new Mat();
        Imgproc.cvtColor(image, grayImage, Imgproc.COLOR_BGR2GRAY);

        // Aplicar o threshold
        double min = Core.minMaxLoc(grayImage).minVal;
        double max = Core.minMaxLoc(grayImage).maxVal;
        Mat contrastImage = new Mat();
        Core.subtract(grayImage, new Scalar(min), contrastImage);
        Core.multiply(contrastImage, new Scalar(255.0 / (max - min)), contrastImage);

        // Salvar a imagem com o threshold aplicado
        Imgcodecs.imwrite(path, contrastImage);

    }
    public void equalizeImage(String nomeArquivo) {
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
        String path = "tmpImages/"+nomeArquivo;

        // Carregar a imagem em cores
        Mat image = Imgcodecs.imread(path);
        Mat grayImage = new Mat();
        Imgproc.cvtColor(image, grayImage, Imgproc.COLOR_BGR2GRAY);
        // Equalizar o histograma
        Mat equalizedImage = new Mat();
        Imgproc.equalizeHist(grayImage, equalizedImage);
        Imgcodecs.imwrite(path, equalizedImage);
    }

    public void quadriculaImg(String nomeArquivo){
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
        //caminho do arquivo
        String path = "tmpImages/"+nomeArquivo;

        // Carregar a imagem em cores
        Mat image = Imgcodecs.imread(path);
        Mat imagemLimiarizada = new Mat();
        Mat imagemCinza = new Mat();
        Imgproc.cvtColor(image, imagemCinza, Imgproc.COLOR_BGR2GRAY);

        Imgproc.adaptiveThreshold(imagemCinza, imagemLimiarizada, 255, Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY_INV, 11, 4);

        // Encontrar os contornos dos objetos presentes na imagem
        List<MatOfPoint> contornos = new ArrayList<>();
        Mat hierarchy = new Mat();
        Imgproc.findContours(imagemLimiarizada, contornos, hierarchy, Imgproc.RETR_EXTERNAL, Imgproc.CHAIN_APPROX_SIMPLE);

        // Desenhar os retângulos delimitadores dos contornos na imagem
        for (MatOfPoint contorno : contornos) {
            Rect retanguloDelimitador = Imgproc.boundingRect(contorno);
            Imgproc.rectangle(image, retanguloDelimitador.tl(), retanguloDelimitador.br(), new Scalar(0, 0, 255), 2);
        }

        Imgcodecs.imwrite(path, image);
    }
}
