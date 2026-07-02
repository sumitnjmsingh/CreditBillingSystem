package actions;

import play.mvc.*;
import utils.JwtUtil;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

public class AuthAction extends Action.Simple {

    @Override
    public CompletionStage<Result> call(Http.Context ctx) {

        String authHeader =
                ctx.request().getHeader("Authorization");

        if (authHeader == null ||
                !authHeader.startsWith("Bearer ")) {

            return CompletableFuture.completedFuture(
                    Results.unauthorized("Missing Token")
            );
        }

        try {

            String token =
                    authHeader.substring(7);

            Long userId =
                    JwtUtil.verifyToken(token);

            ctx.args.put("userId", userId);

            return delegate.call(ctx);

        } catch (Exception e) {

            return CompletableFuture.completedFuture(
                    Results.unauthorized("Invalid Token")
            );
        }
    }
}