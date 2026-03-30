import medumba_counter.conte_med;
import java.lang.reflect.*;

public class TestCounter {
    public static void main(String[] args) throws Exception {
        conte_med c = new conte_med();
        
        // Build the string array the same way the app does
        // Extract from okActionPerformed via reflection
        Field unchifre = conte_med.class.getDeclaredField("unchifre");
        Field deuxchifre = conte_med.class.getDeclaredField("deuxchifre");
        Field Troichifre = conte_med.class.getDeclaredField("Troichifre");
        Field Total = conte_med.class.getDeclaredField("Total");
        unchifre.setAccessible(true);
        deuxchifre.setAccessible(true);
        Troichifre.setAccessible(true);
        Total.setAccessible(true);
        
        Method translate4 = conte_med.class.getDeclaredMethod("translate4", String[].class, String.class);
        translate4.setAccessible(true);
        
        // The number array as built in the app
        String[] num = {
            "bαnbαn",  // 0
            "ncʉ'",    // 1
            "bα̂",      // 2
            "tad",     // 3
            "kuὰ",     // 4
            "tὰn",     // 5
            "ntogə",   // 6
            "sὰmbα̂",  // 7
            "fomə",    // 8
            "bwə̀'ə",  // 9
            "gham",    // 10
            "ncòb",    // 11
            "ŋam",     // 12
            "ntòg",    // 13 (special 6 compound)
            "fòm",     // 14 (special 8 compound)
            "bwə̀'ə̂",  // 15 (special 9 compound)
            "nkʉ",     // 16 (100)
            "mɛnmbʉ̂m", // 17
            "bon",     // 18
            "tû",      // 19
            "ncaꞌ",    // 20
            "ncuꞌ"     // 21
        };
        
        for (int i = 0; i <= 1000; i++) {
            translate4.invoke(c, num, String.valueOf(i));
            String result = (String) Total.get(c);
            System.out.println(i + "\t" + result);
        }
    }
}
