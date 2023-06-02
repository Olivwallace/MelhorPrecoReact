package Utels;

import Model.Tmp;

import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;
import java.io.File;

public class Arq {
    protected static String PATH = "abvString/";
    protected static String ARQ = "abv.txt";
    protected static Scanner buffer;
    protected static FileWriter writer;

    public static void openRead (String path) {
        try {
            buffer = new Scanner(new File(path).getAbsoluteFile() );
        } catch (FileNotFoundException e) {
            System.out.println("Error");
        }
    }
    public static void openWrite(String arq, boolean cont) {
        try {
            writer = new FileWriter(arq,cont);
        } catch (IOException e) {
            System.out.println("Ocorreu um erro ao habilitar a escrita no arquivo: " + e.getMessage());
        }
    }
    public static void write(String dado) throws IOException {
        writer.write(dado);
    }

    public static boolean hasNext(){
        return buffer != null && buffer.hasNext();
    }

    public static String readLine(){
        return (hasNext())? buffer.nextLine() : "";
    }

    public static void close() throws IOException {
        if(buffer != null) buffer.close();
        if (writer != null) {writer.close();}
    }

    public static void armazena(ArrayList<Tmp> produtos) {

    }
}
