import java.util.Arrays;
import java.util.Scanner;

public class Lottery
{
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);

        System.out.println("how many numbers do you need to draw");

        int totalNum = sc.nextInt();

        System.out.println("你选择数据是:" + totalNum);

        int[] total = new int[totalNum];

        for (int i = 1; i <= totalNum; i++) {
            total[i - 1] = i;
        }

        System.out.println(Arrays.toString(total));
        System.out.println("how many numbers do you need to get");
        int resultNum = sc.nextInt();

        // 结果数组
        int[] result = new int[resultNum];
        for (int i = 0; i < resultNum; i++) {
            // 返回 0 - total num 的数据
            var find = (int) (Math.random() * totalNum);
            result[i] = total[find];
            total[find] = total[totalNum - 1];
            totalNum -= 1;
        }

        Arrays.sort(result);
        System.out.println(Arrays.toString(result));

    }
}
