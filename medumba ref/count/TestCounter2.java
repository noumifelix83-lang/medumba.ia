import medumba_counter.conte_med;
import java.lang.reflect.*;
import java.io.*;
import java.nio.charset.StandardCharsets;

public class TestCounter2 {
    static String[] NUM;
    static conte_med c;
    static Field fUnchifre, fDeuxchifre, fTroichifre, fTotal;
    static Method mT1, mT2, mT3, mT4;

    public static void main(String[] args) throws Exception {
        PrintStream out = new PrintStream(System.out, true, "UTF-8");
        System.setOut(out);

        c = new conte_med();

        fUnchifre   = conte_med.class.getDeclaredField("unchifre");
        fDeuxchifre = conte_med.class.getDeclaredField("deuxchifre");
        fTroichifre = conte_med.class.getDeclaredField("Troichifre");
        fTotal      = conte_med.class.getDeclaredField("Total");
        for (Field f : new Field[]{fUnchifre,fDeuxchifre,fTroichifre,fTotal}) f.setAccessible(true);

        mT1 = conte_med.class.getDeclaredMethod("translate1", String[].class, String.class);
        mT2 = conte_med.class.getDeclaredMethod("translate2", String[].class, String.class);
        mT3 = conte_med.class.getDeclaredMethod("translate3", String[].class, String.class);
        mT4 = conte_med.class.getDeclaredMethod("translate4", String[].class, String.class);
        for (Method m : new Method[]{mT1,mT2,mT3,mT4}) m.setAccessible(true);

        // Array from constant pool — exact UTF-8 from class file
        NUM = new String[]{
            "b\u03b1nb\u03b1n",         // 0
            "nc\u0289'",                  // 1
            "b\u03b1\u0302",              // 2
            "tad",                        // 3
            "ku\u1f70",                   // 4
            "t\u1f70n",                   // 5
            "ntog\u0259",                 // 6 standalone
            "s\u1f70mb\u03b1\u0302",      // 7
            "fom\u0259",                  // 8 standalone
            "bw\u0259\u0300'\u0259",      // 9 standalone
            "gham",                       // 10
            "nc\u00f2b",                  // 11 connector
            "\u014bam",                   // 12 tens prefix
            "nt\u00f4g",                  // 13 special 6
            "f\u00f4m",                   // 14 special 8
            "bw\u0259\u0300'\u0259\u0302",// 15 special 9
            "nk\u0289",                   // 16 = 100
            "m\u025bnmb\u0289\u0302m",    // 17
            "bon",                        // 18
            "t\u00fb",                    // 19 hundred connector
            "nca\uA786",                  // 20 = 1000
            "ncu\uA786"                   // 21
        };

        for (int i = 0; i <= 999; i++) {
            String s = String.valueOf(i);
            String result;
            if (s.length() == 1) {
                mT1.invoke(c, NUM, s);
                result = (String)fUnchifre.get(c);
            } else if (s.length() == 2) {
                mT2.invoke(c, NUM, s);
                result = (String)fDeuxchifre.get(c);
            } else {
                mT3.invoke(c, NUM, s);
                result = (String)fTroichifre.get(c);
            }
            out.println(i + "\t" + result);
        }
        // Also 1000
        mT4.invoke(c, NUM, "1000");
        out.println("1000\t" + fTotal.get(c));
    }
}
