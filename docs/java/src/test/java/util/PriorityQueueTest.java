package test.java.util;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.PriorityQueue;

public class PriorityQueueTest
{
    @Test
    @DisplayName("优先队列 - PriorityQueue - localDate")
    public void localDate()
    {
        var pq = new PriorityQueue<LocalDate>();
        pq.add(LocalDate.of(2001, 4, 28));
        pq.add(LocalDate.of(1949, 10, 1));
        pq.add(LocalDate.of(2009, 2, 28));
        pq.add(LocalDate.of(1937, 7, 7));

        System.out.println("Iterating over elements ...");

        for (LocalDate ld : pq) {
            System.out.println(ld);
        }

        System.out.println("Removing priority element ...");
        while (!pq.isEmpty()) {
            System.out.println(pq.remove());
        }
    }
}
