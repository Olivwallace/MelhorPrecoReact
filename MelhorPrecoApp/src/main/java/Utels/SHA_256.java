package Utels;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public class SHA_256 {

    public static String generateSalt() {
        SecureRandom random = new SecureRandom();
        byte[] saltBytes = new byte[16];
        random.nextBytes(saltBytes);
        return bytesToHex(saltBytes);
    }

    public static String hashPassword(String password, String salt){
        String saltedPassword = password + salt;
        return  hash(saltedPassword);
    }

    public static String hash(String str) {
        byte[] hashBytes;

        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            hashBytes = md.digest(str.getBytes());

        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }

        return bytesToHex(hashBytes);
    }

    private static String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }

}
