package core.basic.object;

import core.basic.model.Employee;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

public class StaticFieldTest
{
    @Test
    public void employee()
    {
        // 静态 ID 变量
        var staff = new ArrayList<Employee>();
        staff.add(new Employee("duoli", 300));
        staff.add(new Employee("qian", 200));
        staff.add(new Employee("ming", 400));

        System.out.println("Output Employee ...");

        for (Employee e : staff) {
            e.setId();
            System.out.println("name=" + e.getName() + ", id=" + e.getId() + ", salary=" + e.getSalary());
        }

        int n = Employee.getNextId();
        System.out.println("Employee nextId is : " + n);
    }
}
