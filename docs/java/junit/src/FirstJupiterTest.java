package junit;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class FirstJupiterTest
{

    @Test
    public void addition()
    {
        assertEquals(3, Integer.sum(1, 2));
    }
}
