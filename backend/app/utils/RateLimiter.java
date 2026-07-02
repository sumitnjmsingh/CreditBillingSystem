package utils;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

public class RateLimiter {

    private static final ConcurrentHashMap<String, ConcurrentLinkedQueue<Long>> requests = new ConcurrentHashMap<>();

    public static boolean allowRequest(String key, int maxRequests, long windowMillis) {

        long now = System.currentTimeMillis();

        ConcurrentLinkedQueue<Long> queue = requests.get(key);

        if (queue == null) {

            queue = new ConcurrentLinkedQueue<>();

            requests.put(key, queue);

        }

        while (!queue.isEmpty() && (now - queue.peek()) > windowMillis) {
            queue.poll();
        }

        if (queue.size() >= maxRequests) {
            return false;
        }

        queue.add(now);

        return true;
    }
}