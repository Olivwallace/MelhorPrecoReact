/**
 * @file ProviderApi.java
 * @author Wallace Freitas Oliveira (https://github.com/Olivwallace)
 * @brief Api Provider For Melhor Preco App
 * @date 22-04-2023
 */

package App;

import Service.ListService;
import Service.PerfilService;
import Service.RegisterService;
import Service.SingInService;
import static spark.Spark.*;

public class ProviderApi {

    public static SingInService singInService = new SingInService();
    public static RegisterService registerService = new RegisterService();
    public static PerfilService perfilService = new PerfilService();
    public static ListService listService = new ListService();

    public static void main(String[] args){
        port(4567);

        //staticFileLocation("/com.melhorpreco_app");

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
        // post("/updateList", (request, response) -> listService.updateList(request, response));
        //post("/getLists", (request, response) -> listService.getLists(request, response));
        //post("/deleteList", (request, response) -> listService.deleteList(request, response));

        //post("/createList", (request, response) ->)

        //post("/searchMercados", (request, reponse) -> appService.searchMercados(request, response));
        //post("/searchProdutos", (request, response) -> appService.searchProdutos(request, response));
    }

}
