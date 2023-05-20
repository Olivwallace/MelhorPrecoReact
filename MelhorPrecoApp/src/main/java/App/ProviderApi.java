/**
 * @file ProviderApi.java
 * @author Wallace Freitas Oliveira (https://github.com/Olivwallace)
 * @author Jerson Vitor de Paula Gomes
 * @brief Api Provider For Melhor Preco App
 * @date 22-04-2023
 */

package App;


import Connection.CorsFilter;
import Service.*;

import static spark.Spark.*;

public class ProviderApi {

    public static SingInService singInService = new SingInService();
    public static RegisterService registerService = new RegisterService();
    public static PerfilService perfilService = new PerfilService();
    public static ListService listService = new ListService();
    public static SearchService searchService = new SearchService();

    public static NotaService notaService = new NotaService();
    public static void main(String[] args){
        // Habilita o CORS para todas as origens e métodos
        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }
            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }
            return "OK";
        });

        // Habilita o CORS para todas as origens e métodos
        before((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
        });


        //-------------- Routes Login ----------------------------------------------------------
        post("/login", (request, response) -> singInService.singInUser(request, response) );
        post("/validateToken", (request, response) -> singInService.validateToken(request, response));
        post("/logout", (request, response) -> singInService.logout(request, response));

        //-------------- Routes Register ----------------------------------------------------------
        post("/existEmail", (request, response) -> registerService.existEmail(request, response));
        post("/existUser", (request, response) -> registerService.existUser(request, response));
        post("/registerUser", (request, response) -> registerService.registerUser(request, response));

        //-------------- Routes Config User --------------------------------------------------------
        post("/updateUser", (request, response) -> registerService.updateUser(request, response));
        post("/updatePassword", (request, response) -> registerService.updatePassword(request, response));

        //-------------- Perfil Config App ---------------------------------------------------------------
        post("/updatePontuacao", (request, response) -> perfilService.setPontos(request, response));
        post("/getUser", (request, response) -> perfilService.getUser(request, response));
        post("/deleteUser", (request, response) -> perfilService.deleteUser(request, response));

        //------------- Lista App -----------------------------------------------------------------------
        post("/createList", (request, response) -> listService.createList(request, response));
        post("/updateList", (request, response) -> listService.updateList(request, response));
        post("/getLists", (request, response) -> listService.getLists(request, response));
        post("/deleteList", (request, response) -> listService.deleteList(request, response));

        //--------- Buscas -------------------------------------------------------------------------------
        post("/getMercados", (request, response) -> searchService.getMercados(request, response));
        post("/getProdutos" ,(request, response) -> searchService.getProdutos(request, response));

        post("/getProductPrice", (request, response) -> searchService.getMercados(request, response));
        post("/getProductDistance", (request, response) -> searchService.getMercados(request, response));
        post("/getProductRating", (request, response) -> searchService.getMercados(request, response));


        //post("/searchMercados", (request, response) -> appService.searchMercados(request, response));
        //post("/searchProdutos", (request, response) -> appService.searchProdutos(request, response));
        //-------- Notas -----------------------------------
        post( "/uploadNota",(request, response) -> notaService.uploadNota(request, response));
        init();
    }

}
