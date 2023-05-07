package Connection;

import spark.Filter;
import spark.Request;
import spark.Response;

public class CorsFilter implements Filter {

    @Override
    public void handle(Request request, Response response) throws Exception {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
        response.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");

        // Handle the preflight request
        if (request.requestMethod().equals("OPTIONS")) {
            response.status(200);
            response.body("");
        }
    }
}
