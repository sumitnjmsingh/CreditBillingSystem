package utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;

import java.util.Date;

public class JwtUtil {

    private static final Config config = ConfigFactory.load();
    private static final String SECRET = config.getString("SECRET");

    public static String generateToken(Long userId, String userEmail) {

        return JWT.create().withClaim("userId", userId).withClaim("userEmail", userEmail).withIssuedAt(new Date()).withExpiresAt(new Date(System.currentTimeMillis() + 86400000)) // 1 day
                .sign(Algorithm.HMAC256(SECRET));
    }

    public static Long verifyToken(String token) {

        return JWT.require(Algorithm.HMAC256(SECRET)).build().verify(token).getClaim("userId").asLong();
    }
}