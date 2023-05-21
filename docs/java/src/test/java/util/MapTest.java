package test.java.util;

import core.basic.model.Employee;
import org.junit.jupiter.api.Test;

import java.util.HashMap;

public class MapTest
{
    @Test
    public void hashMap()
    {
        var hm = new HashMap<String, Employee>();
        hm.put("duoli", new Employee("duoli"));
        hm.put("qian", new Employee("qian"));
        hm.put("ming", new Employee("ming"));

        // print
        System.out.println(hm);

        // remove
        hm.remove("qian");

        // replace
        hm.put("ming", new Employee("ming tian"));

        // get
        System.out.println(hm.get("duoli"));

        // iterate
        hm.forEach((s, e) -> System.out.println("key:" + s + "; employee=" + e));
    }
}
