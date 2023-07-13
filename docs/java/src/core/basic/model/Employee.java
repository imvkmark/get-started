package core.basic.model;

import core.basic.util.StrHelper;

public class Employee
{
    private static int nextId = 1;

    private final String name;

    private final Double salary;

    private int id;


    public Employee(String s, double d)
    {
        name = s;
        salary = d;
        id = 0;
    }

    public Employee(String s)
    {
        name = s;
        salary = 0.0;
        id = 0;
    }

    public void setId()
    {
        id = nextId;
        nextId++;
    }

    public static int getNextId()
    {
        return nextId;
    }

    public String getName()
    {
        return name;
    }

    public Double getSalary()
    {
        return salary;
    }

    public int getId()
    {
        return id;
    }

    public String toString()
    {
        return "name:" + name + ";salary:" + salary;
    }

    public void say(int to)
    {
        System.out.println("say to" + to + ":" + StrHelper.randomString(8));
    }
}
