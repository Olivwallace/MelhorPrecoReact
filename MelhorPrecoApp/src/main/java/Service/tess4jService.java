package Service;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.opencv.core.Core;
import org.opencv.core.Mat;
import org.opencv.core.CvType;
import org.opencv.core.MatOfByte;
import org.opencv.core.MatOfInt;
import org.opencv.core.MatOfInt4;
import org.opencv.core.Scalar;
import org.opencv.core.Size;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.CLAHE;
import org.opencv.imgproc.Imgproc;

import java.io.File;
public class tess4jService {

    public String tesseract(String path) {
        File imageFile = new File(path);
        Tesseract tess4j = new Tesseract();
        //O datapath tem que ser alterado caso essa pasta não esteja nesse caminho
        tess4j.setDatapath("C:\\Program Files\\Tesseract-OCR\\tessdata");
        tess4j.setLanguage("por");

        String result = "";
        try {
            result = tess4j.doOCR(imageFile);

        } catch (TesseractException e) {
            System.err.println(e.getMessage());
        }
        return result;
    }
    public void convertGray(String path){
        System.out.println(path);
        String a = "tmpImages/"+path;
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
        // Carregar a imagem em cores
        Mat image = Imgcodecs.imread(a);
        System.out.println(image);
        // Converter para tons de cinza
            if (!image.empty()){
                Mat grayImage = new Mat();
                Mat finalImg = new Mat();
                Imgproc.cvtColor(image, grayImage, Imgproc.COLOR_BGR2GRAY);
                CLAHE clahe = Imgproc.createCLAHE(5);

                clahe.apply(grayImage,finalImg);
                // Salvar a imagem em tons de cinza
                Imgcodecs.imwrite(a, finalImg);
            }
    }

}
