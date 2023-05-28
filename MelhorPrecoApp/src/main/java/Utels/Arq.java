package Utels;

import java.io.FileNotFoundException;
import java.util.Scanner;
import java.io.File;

public class Arq {
    protected static String PATH = "abvString/";
    protected static String ARQ = "abv.txt";
    protected static Scanner buffer;

    public static void openRead () {
        try {
            buffer = new Scanner(new File(PATH + ARQ).getAbsoluteFile() );
        } catch (FileNotFoundException e) {
            System.out.println("Error");
        }
    }

    public static boolean hasNext(){
        return buffer != null && buffer.hasNext();
    }

    public static String readLine(){
        return (hasNext())? buffer.nextLine() : "";
    }

    public static void close(){
        if(buffer != null) buffer.close();
    }
}
