package Utels;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


public class Contraction_Map {

    private static final Map<String, ArrayList<String> > CONTRACTIONS_MAP = new HashMap<>();
    private static final String FILE_ABV = "abv.txt";

    /**
     * Adiciona arquivo de contração de strings comuns em notas fiscais a um hash map
     * @param abv Abreviatura
     * @param palavra Palavra completa relacionada a abreviatura
     */
    public static void adiconarContracao(String abv, String palavra) {
        if (CONTRACTIONS_MAP.containsKey(abv)) {
            ArrayList<String> listABV = CONTRACTIONS_MAP.get(abv);
            listABV.add(palavra);
        } else {
            ArrayList<String> listABV = new ArrayList<>();
            listABV.add(palavra);
            CONTRACTIONS_MAP.put(abv, listABV);
        }
    }

    /**
     * Obtem palavra baseada na abreviação disponibilizada pelo mercado
     * @param abv Abreviação na nota
     * @return Array Strings equivales a palavra.
     */
    public static ArrayList<String> getPalavra(String abv) {
        return CONTRACTIONS_MAP.get(abv.toLowerCase());
    }

    /**
     * Inicializa estrutura hash map para abreviaturas padrões.
     */
    public static void initAbvMap(){
        Arq.openRead();
        while(Arq.hasNext()){
            String[] strings = Arq.readLine().split(",");
            adiconarContracao(strings[0].toLowerCase(), strings[1].toLowerCase());
        }
        Arq.close();
    }
}

