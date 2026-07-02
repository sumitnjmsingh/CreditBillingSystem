package utils;

import java.util.Random;

public class CardUtil {

    public static String generateCardNumber() {

        Random random = new Random();

        StringBuilder card = new StringBuilder();

        card.append(4);

        for (int i = 1; i < 16; i++) {

            card.append(random.nextInt(10));

        }

        return card.toString();

    }

}
