/*
 * Decompiled with CFR 0.152.
 */
package medumba_counter;

import java.awt.Color;
import java.awt.EventQueue;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.MouseMotionAdapter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.GroupLayout;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;
import javax.swing.LayoutStyle;
import javax.swing.UIManager;
import javax.swing.UnsupportedLookAndFeelException;

public class conte_med
extends JFrame {
    String unchifre;
    String deuxchifre;
    String Troichifre;
    String partie1;
    String Total;
    private JButton cancel;
    private JLabel ecran;
    private JLabel jLabel1;
    private JLabel jLabel2;
    private JTextField nombre;
    private JButton ok;

    public conte_med() {
        this.initComponents();
    }

    private void initComponents() {
        this.jLabel1 = new JLabel();
        this.jLabel2 = new JLabel();
        this.nombre = new JTextField();
        this.cancel = new JButton();
        this.ok = new JButton();
        this.ecran = new JLabel();
        this.setDefaultCloseOperation(3);
        this.setBackground(new Color(255, 153, 153));
        this.setForeground(new Color(255, 204, 204));
        this.setIconImages(this.getIconImages());
        this.jLabel1.setFont(new Font("Tahoma", 3, 18));
        this.jLabel1.setText("S\u0259\u030c\ua78c m\u0259\u0300bw\u0254 nt\u0289\u0302m t\u0289nt\u0259\u0300 k\u0259\u0300 bod!!!");
        this.jLabel1.addMouseListener(new MouseAdapter(){

            @Override
            public void mouseEntered(MouseEvent evt) {
                conte_med.this.jLabel1MouseEntered(evt);
            }
        });
        this.jLabel2.setFont(new Font("Tahoma", 1, 18));
        this.jLabel2.setText("So\u030c yu\u0300 ju\u0302 t\u0289nt\u0259\u0300 ns\u0259\u030cni\u0300:");
        this.nombre.setFont(new Font("Tahoma", 1, 18));
        this.nombre.setHorizontalAlignment(4);
        this.nombre.addMouseMotionListener(new MouseMotionAdapter(){

            @Override
            public void mouseMoved(MouseEvent evt) {
                conte_med.this.nombreMouseMoved(evt);
            }
        });
        this.cancel.setBackground(new Color(255, 153, 153));
        this.cancel.setFont(new Font("Tahoma", 1, 24));
        this.cancel.setText("bw\u0259\u0300t\u0259\u030c");
        this.cancel.addMouseMotionListener(new MouseMotionAdapter(){

            @Override
            public void mouseMoved(MouseEvent evt) {
                conte_med.this.cancelMouseMoved(evt);
            }
        });
        this.cancel.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent evt) {
                conte_med.this.cancelActionPerformed(evt);
            }
        });
        this.ok.setBackground(new Color(255, 255, 0));
        this.ok.setFont(new Font("Tahoma", 1, 24));
        this.ok.setText("m\u0259 bam");
        this.ok.addMouseMotionListener(new MouseMotionAdapter(){

            @Override
            public void mouseMoved(MouseEvent evt) {
                conte_med.this.okMouseMoved(evt);
            }
        });
        this.ok.addActionListener(new ActionListener(){

            @Override
            public void actionPerformed(ActionEvent evt) {
                conte_med.this.okActionPerformed(evt);
            }
        });
        this.ecran.setBackground(new Color(255, 255, 204));
        this.ecran.setFont(new Font("Times New Roman", 1, 14));
        this.ecran.setOpaque(true);
        GroupLayout layout = new GroupLayout(this.getContentPane());
        this.getContentPane().setLayout(layout);
        layout.setHorizontalGroup(layout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(GroupLayout.Alignment.TRAILING, layout.createSequentialGroup().addContainerGap(197, Short.MAX_VALUE).addComponent(this.jLabel1, -2, 317, -2).addGap(154, 154, 154)).addGroup(layout.createSequentialGroup().addGap(101, 101, 101).addComponent(this.jLabel2).addPreferredGap(LayoutStyle.ComponentPlacement.UNRELATED).addComponent(this.nombre, -2, 197, -2).addContainerGap(-1, Short.MAX_VALUE)).addGroup(GroupLayout.Alignment.TRAILING, layout.createSequentialGroup().addGap(79, 79, 79).addComponent(this.cancel, -2, 135, -2).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED, -1, Short.MAX_VALUE).addComponent(this.ok, -2, 153, -2).addGap(75, 75, 75)).addGroup(layout.createSequentialGroup().addGap(19, 19, 19).addComponent(this.ecran, -1, -1, Short.MAX_VALUE).addContainerGap()));
        layout.setVerticalGroup(layout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(layout.createSequentialGroup().addContainerGap().addComponent(this.jLabel1, -2, 36, -2).addGap(31, 31, 31).addGroup(layout.createParallelGroup(GroupLayout.Alignment.BASELINE).addComponent(this.jLabel2, -2, 43, -2).addComponent(this.nombre, -2, 43, -2)).addGap(27, 27, 27).addComponent(this.ecran, -2, 65, -2).addGap(28, 28, 28).addGroup(layout.createParallelGroup(GroupLayout.Alignment.BASELINE).addComponent(this.cancel, -2, 52, -2).addComponent(this.ok, -2, 52, -2)).addContainerGap(43, Short.MAX_VALUE)));
        this.pack();
    }

    private void okActionPerformed(ActionEvent evt) {
        String[] num = new String[24];
        num[0] = "b\u03b1nb\u03b1n";
        num[1] = "nc\u0289'";
        num[2] = "b\u03b1\u0302";
        num[3] = "tad";
        num[4] = "ku\u03b1\u0300";
        num[5] = "t\u03b1\u0300n";
        num[6] = "ntog\u0259";
        num[7] = "s\u03b1\u0300mb\u03b1\u0302";
        num[8] = "fom\u0259";
        num[9] = "bw\u0259\u0300'\u0259";
        num[10] = "gham";
        num[11] = "nco\u0300b";
        num[12] = "\u014bam";
        num[13] = "nto\u0302g";
        num[14] = "fo\u0302m";
        num[15] = "bw\u0259\u0300'\u0259\u0302";
        num[16] = "nk\u0289";
        num[17] = "m\u025bnmb\u0289\u0302m";
        num[18] = "bon";
        num[19] = "tu\u0302";
        num[20] = "nca\ua78c";
        num[21] = "ncu\ua78c";
        String numb = this.nombre.getText();
        int con = Integer.parseInt(numb);
        String number = String.valueOf(con);
        switch (number.length()) {
            case 1: {
                this.translate1(num, number);
                this.ecran.setText(this.unchifre);
                break;
            }
            case 2: {
                this.translate2(num, number);
                this.ecran.setText(this.deuxchifre);
                break;
            }
            case 3: {
                this.translate3(num, number);
                this.ecran.setText(this.Troichifre);
                break;
            }
            case 4: 
            case 5: 
            case 6: {
                this.translate4(num, number);
                this.ecran.setText(this.Total);
            }
        }
    }

    private void jLabel1MouseEntered(MouseEvent evt) {
        this.jLabel1.setToolTipText("Made by z\u0259nu\u0300");
    }

    private void nombreMouseMoved(MouseEvent evt) {
        this.nombre.setToolTipText("Enter a number:");
    }

    private void okMouseMoved(MouseEvent evt) {
        this.ok.setToolTipText("press to get answer!!!");
    }

    private void cancelMouseMoved(MouseEvent evt) {
        this.cancel.setToolTipText("press to set all value to 0");
    }

    private void cancelActionPerformed(ActionEvent evt) {
        this.ecran.setText("");
        this.nombre.setText("");
    }

    public void translate1(String[] s, String a) {
        int textnum = Integer.parseInt(a);
        for (int i = 0; i < 10; ++i) {
            if (textnum != i) continue;
            this.unchifre = s[i];
        }
    }

    public void translate2(String[] s, String a) {
        int getnum = Integer.parseInt(a);
        int head = getnum / 10;
        int bac = getnum % 10;
        block0 : switch (head) {
            case 1: {
                switch (bac) {
                    case 0: {
                        this.deuxchifre = s[10];
                        break block0;
                    }
                    case 6: {
                        this.deuxchifre = s[11] + s[13] + " " + s[10];
                        break block0;
                    }
                    case 8: {
                        this.deuxchifre = s[11] + s[14] + " " + s[10];
                        break block0;
                    }
                    case 9: {
                        this.deuxchifre = s[11] + s[15] + " " + s[10];
                        break block0;
                    }
                }
                this.deuxchifre = s[11] + s[bac] + " " + s[10];
                break;
            }
            case 0: {
                this.translate1(s, a);
                this.deuxchifre = this.unchifre;
                break;
            }
            case 3: 
            case 5: {
                switch (bac) {
                    case 0: {
                        this.deuxchifre = s[12] + "n" + s[head];
                        break block0;
                    }
                    case 6: {
                        this.deuxchifre = s[11] + s[13] + " " + s[12] + "n" + s[head];
                        break block0;
                    }
                    case 8: {
                        this.deuxchifre = s[11] + s[14] + " " + s[12] + "n" + s[head];
                        break block0;
                    }
                    case 9: {
                        this.deuxchifre = s[11] + s[15] + " " + s[12] + "n" + s[head];
                        break block0;
                    }
                }
                this.deuxchifre = s[11] + s[bac] + " " + s[12] + "n" + s[head];
                break;
            }
            default: {
                switch (bac) {
                    case 0: {
                        this.deuxchifre = s[12] + s[head];
                        break block0;
                    }
                    case 6: {
                        this.deuxchifre = s[11] + s[13] + " " + s[12] + s[head];
                        break block0;
                    }
                    case 8: {
                        this.deuxchifre = s[11] + s[14] + " " + s[12] + s[head];
                        break block0;
                    }
                    case 9: {
                        this.deuxchifre = s[11] + s[15] + " " + s[12] + s[head];
                        break block0;
                    }
                }
                this.deuxchifre = s[11] + s[bac] + " " + s[12] + s[head];
            }
        }
    }

    public void translate3(String[] s, String a) {
        if ("100".equals(a)) {
            this.Troichifre = s[16];
        } else {
            int getnum = Integer.parseInt(a);
            int head = getnum / 100;
            int mid = getnum / 10 % 10;
            int bac = getnum % 100 % 10;
            block0 : switch (head) {
                case 0: {
                    switch (mid) {
                        case 0: {
                            this.Troichifre = s[bac];
                            break block0;
                        }
                    }
                    String b = a.substring(1);
                    this.translate2(s, b);
                    this.Troichifre = this.deuxchifre;
                    break;
                }
                case 1: {
                    switch (mid) {
                        case 0: {
                            switch (bac) {
                                case 6: {
                                    this.Troichifre = s[13] + s[19] + " " + s[16];
                                    break block0;
                                }
                                case 8: {
                                    this.Troichifre = s[14] + s[19] + " " + s[16];
                                    break block0;
                                }
                                case 9: {
                                    this.Troichifre = s[15] + s[19] + " " + s[16];
                                    break block0;
                                }
                            }
                            this.Troichifre = s[bac] + s[19] + " " + s[16];
                            break block0;
                        }
                        case 1: {
                            switch (bac) {
                                case 0: {
                                    this.Troichifre = s[17] + " " + s[16];
                                    break block0;
                                }
                                case 6: {
                                    this.Troichifre = s[11] + s[13] + " " + s[17] + " " + s[16];
                                    break block0;
                                }
                                case 8: {
                                    this.Troichifre = s[11] + s[14] + " " + s[17] + " " + s[16];
                                    break block0;
                                }
                                case 9: {
                                    this.Troichifre = s[11] + s[14] + " " + s[17] + " " + s[16];
                                    break block0;
                                }
                            }
                            this.Troichifre = s[11] + s[bac] + " " + s[17] + " " + s[16];
                            break block0;
                        }
                        case 6: {
                            switch (bac) {
                                case 0: {
                                    this.Troichifre = s[18] + s[13] + " " + s[16];
                                    break block0;
                                }
                                case 6: {
                                    this.Troichifre = s[11] + s[13] + " " + s[18] + s[13] + " " + s[16];
                                    break block0;
                                }
                                case 8: {
                                    this.Troichifre = s[11] + s[14] + " " + s[18] + s[13] + " " + s[16];
                                    break block0;
                                }
                                case 9: {
                                    this.Troichifre = s[11] + s[15] + " " + s[18] + s[13] + " " + s[16];
                                    break block0;
                                }
                            }
                            this.Troichifre = s[11] + s[bac] + " " + s[18] + s[14] + " " + s[16];
                            break block0;
                        }
                        case 8: {
                            switch (bac) {
                                case 0: {
                                    this.Troichifre = s[18] + s[13] + " " + s[16];
                                    break block0;
                                }
                                case 6: {
                                    this.Troichifre = s[11] + s[13] + " " + s[18] + s[13] + " " + s[16];
                                    break block0;
                                }
                                case 8: {
                                    this.Troichifre = s[11] + s[14] + " " + s[18] + s[14] + " " + s[16];
                                    break block0;
                                }
                                case 9: {
                                    this.Troichifre = s[11] + s[14] + " " + s[18] + s[14] + " " + s[16];
                                    break block0;
                                }
                            }
                            this.Troichifre = s[11] + s[bac] + " " + s[18] + s[14] + " " + s[16];
                            break block0;
                        }
                    }
                    switch (bac) {
                        case 0: {
                            this.Troichifre = s[18] + s[mid] + " " + s[16];
                            break block0;
                        }
                        case 6: {
                            this.Troichifre = s[11] + s[13] + " " + s[18] + s[mid] + " " + s[16];
                            break block0;
                        }
                        case 8: {
                            this.Troichifre = s[11] + s[14] + " " + s[18] + s[mid] + " " + s[16];
                            break block0;
                        }
                        case 9: {
                            this.Troichifre = s[11] + s[15] + " " + s[18] + s[mid] + " " + s[16];
                            break block0;
                        }
                    }
                    this.Troichifre = s[11] + s[bac] + " " + s[18] + s[mid] + " " + s[16];
                    break;
                }
                default: {
                    switch (mid) {
                        case 0: {
                            switch (bac) {
                                case 0: {
                                    this.Troichifre = s[16] + s[head];
                                    break block0;
                                }
                                case 6: {
                                    this.Troichifre = s[13] + s[19] + " " + s[16] + s[head];
                                    break block0;
                                }
                                case 8: {
                                    this.Troichifre = s[14] + s[19] + " " + s[16] + s[head];
                                    break block0;
                                }
                                case 9: {
                                    this.Troichifre = s[15] + s[19] + " " + s[16] + s[head];
                                    break block0;
                                }
                            }
                            this.Troichifre = s[bac] + s[19] + " " + s[16] + s[head];
                            break block0;
                        }
                        case 1: {
                            switch (bac) {
                                case 0: {
                                    this.Troichifre = s[17] + " " + s[16] + s[head];
                                    break block0;
                                }
                                case 6: {
                                    this.Troichifre = s[11] + s[13] + " " + s[17] + " " + s[16] + s[head];
                                    break block0;
                                }
                                case 8: {
                                    this.Troichifre = s[11] + s[14] + " " + s[17] + " " + s[16] + s[head];
                                    break block0;
                                }
                                case 9: {
                                    this.Troichifre = s[11] + s[15] + " " + s[17] + " " + s[16] + s[head];
                                    break block0;
                                }
                            }
                            this.Troichifre = s[11] + s[bac] + " " + s[17] + " " + s[16] + s[head];
                            break block0;
                        }
                        case 6: {
                            switch (bac) {
                                case 0: {
                                    this.Troichifre = s[18] + s[13] + " " + s[16] + s[head];
                                    break block0;
                                }
                                case 6: {
                                    this.Troichifre = s[11] + s[13] + " " + s[18] + s[13] + " " + s[16] + s[head];
                                    break block0;
                                }
                                case 8: {
                                    this.Troichifre = s[11] + s[14] + " " + s[18] + s[13] + " " + s[16] + s[head];
                                    break block0;
                                }
                                case 9: {
                                    this.Troichifre = s[11] + s[15] + " " + s[18] + s[13] + " " + s[16] + s[head];
                                    break block0;
                                }
                            }
                            this.Troichifre = s[11] + s[bac] + " " + s[18] + s[13] + " " + s[16] + s[head];
                            break block0;
                        }
                        case 8: {
                            switch (bac) {
                                case 0: {
                                    this.Troichifre = s[18] + s[16] + " " + s[16] + s[head];
                                    break block0;
                                }
                                case 6: {
                                    this.Troichifre = s[11] + s[13] + " " + s[18] + s[14] + " " + s[16] + s[head];
                                    break block0;
                                }
                                case 8: {
                                    this.Troichifre = s[11] + s[14] + " " + s[18] + s[14] + " " + s[16] + s[head];
                                    break block0;
                                }
                                case 9: {
                                    this.Troichifre = s[11] + s[15] + " " + s[18] + s[14] + " " + s[16] + s[head];
                                    break block0;
                                }
                            }
                            this.Troichifre = s[11] + s[bac] + " " + s[18] + s[14] + " " + s[16] + s[head];
                            break block0;
                        }
                        case 9: {
                            switch (bac) {
                                case 0: {
                                    this.Troichifre = s[18] + s[16] + " " + s[16] + s[head];
                                    break block0;
                                }
                                case 6: {
                                    this.Troichifre = s[11] + s[13] + " " + s[18] + s[15] + " " + s[16] + s[head];
                                    break block0;
                                }
                                case 8: {
                                    this.Troichifre = s[11] + s[14] + " " + s[18] + s[15] + " " + s[16] + s[head];
                                    break block0;
                                }
                                case 9: {
                                    this.Troichifre = s[11] + s[15] + " " + s[18] + s[15] + " " + s[16] + s[head];
                                    break block0;
                                }
                            }
                            this.Troichifre = s[11] + s[bac] + " " + s[18] + s[15] + " " + s[16] + s[head];
                            break block0;
                        }
                    }
                    switch (bac) {
                        case 0: {
                            this.Troichifre = s[18] + s[mid] + " " + s[20] + s[head];
                            break block0;
                        }
                        case 6: {
                            this.Troichifre = s[11] + s[13] + " " + s[18] + s[mid] + " " + s[16] + s[head];
                            break block0;
                        }
                        case 8: {
                            this.Troichifre = s[11] + s[14] + " " + s[18] + s[mid] + " " + s[16] + s[head];
                            break block0;
                        }
                        case 9: {
                            this.Troichifre = s[11] + s[15] + " " + s[18] + s[mid] + " " + s[16] + s[head];
                            break block0;
                        }
                    }
                    this.Troichifre = s[11] + s[bac] + " " + s[18] + s[mid] + " " + s[16] + s[head];
                }
            }
        }
    }

    public void translationpart1(String[] s, String part) {
        int getnum = Integer.parseInt(part);
        int head = getnum / 100;
        int mid = getnum / 10 % 10;
        int bac = getnum % 100 % 10;
        block0 : switch (head) {
            case 0: {
                switch (mid) {
                    case 0: {
                        switch (bac) {
                            case 0: {
                                this.partie1 = "";
                                break block0;
                            }
                            case 6: {
                                this.partie1 = "ntog" + s[19];
                                break block0;
                            }
                            case 8: {
                                this.partie1 = "fom" + s[19];
                                break block0;
                            }
                        }
                        this.partie1 = s[bac] + s[19];
                        break block0;
                    }
                    case 1: {
                        switch (bac) {
                            case 0: {
                                this.partie1 = s[17];
                                break block0;
                            }
                            case 6: {
                                this.partie1 = s[11] + s[13] + " " + s[17];
                                break block0;
                            }
                            case 8: {
                                this.partie1 = s[11] + s[14] + " " + s[17];
                                break block0;
                            }
                            case 9: {
                                this.partie1 = s[11] + s[15] + " " + s[17];
                                break block0;
                            }
                        }
                        this.partie1 = s[11] + s[bac] + " " + s[17];
                        break block0;
                    }
                    case 6: {
                        switch (bac) {
                            case 0: {
                                this.partie1 = s[18] + s[13];
                                break block0;
                            }
                            case 6: {
                                this.partie1 = s[11] + s[13] + " " + s[18] + s[13];
                                break block0;
                            }
                            case 8: {
                                this.partie1 = s[11] + s[14] + " " + s[18] + s[13];
                                break block0;
                            }
                            case 9: {
                                this.partie1 = s[11] + s[15] + " " + s[18] + s[13];
                                break block0;
                            }
                        }
                        this.partie1 = s[11] + s[bac] + " " + s[18] + s[13];
                        break block0;
                    }
                    case 8: {
                        switch (bac) {
                            case 0: {
                                this.partie1 = s[18] + s[14];
                                break block0;
                            }
                            case 6: {
                                this.partie1 = s[11] + s[13] + " " + s[18] + s[14];
                                break block0;
                            }
                            case 8: {
                                this.partie1 = s[11] + s[14] + " " + s[18] + s[14];
                                break block0;
                            }
                            case 9: {
                                this.partie1 = s[11] + s[15] + " " + s[18] + s[14];
                                break block0;
                            }
                        }
                        this.partie1 = s[11] + s[bac] + " " + s[18] + s[14];
                        break block0;
                    }
                    case 9: {
                        switch (bac) {
                            case 0: {
                                this.partie1 = s[18] + s[15];
                                break block0;
                            }
                            case 6: {
                                this.partie1 = s[11] + s[13] + " " + s[18] + s[15];
                                break block0;
                            }
                            case 8: {
                                this.partie1 = s[11] + s[14] + " " + s[18] + s[15];
                                break block0;
                            }
                            case 9: {
                                this.partie1 = s[11] + s[15] + " " + s[18] + s[15];
                                break block0;
                            }
                        }
                        this.partie1 = s[11] + s[bac] + " " + s[18] + s[15];
                        break block0;
                    }
                }
                switch (bac) {
                    case 0: {
                        this.partie1 = s[18] + s[mid];
                        break block0;
                    }
                    case 6: {
                        this.partie1 = s[11] + s[13] + " " + s[18] + s[mid];
                        break block0;
                    }
                    case 8: {
                        this.partie1 = s[11] + s[14] + " " + s[18] + s[mid];
                        break block0;
                    }
                    case 9: {
                        this.partie1 = s[11] + s[15] + " " + s[18] + s[mid];
                        break block0;
                    }
                }
                this.partie1 = s[11] + s[bac] + " " + s[18] + s[mid];
                break;
            }
            case 1: {
                switch (mid) {
                    case 0: {
                        switch (bac) {
                            case 0: {
                                this.partie1 = s[11] + s[16];
                                break block0;
                            }
                            case 6: {
                                this.partie1 = "ntog" + s[19] + " " + s[11] + s[16];
                                break block0;
                            }
                            case 8: {
                                this.partie1 = "fom" + s[19] + " " + s[11] + s[16];
                                break block0;
                            }
                        }
                        this.partie1 = s[bac] + s[19] + " " + s[11] + s[16];
                        break block0;
                    }
                    case 1: {
                        switch (bac) {
                            case 0: {
                                this.partie1 = s[17] + " " + s[11] + s[16];
                                break block0;
                            }
                            case 6: {
                                this.partie1 = s[11] + s[13] + " " + s[17] + " " + s[11] + s[16];
                                break block0;
                            }
                            case 8: {
                                this.partie1 = s[11] + s[14] + " " + s[17] + " " + s[11] + s[16];
                                break block0;
                            }
                            case 9: {
                                this.partie1 = s[11] + s[15] + " " + s[17] + " " + s[11] + s[16];
                                break block0;
                            }
                        }
                        this.partie1 = s[11] + s[bac] + " " + s[17] + " " + s[11] + s[16];
                        break block0;
                    }
                    case 6: {
                        switch (bac) {
                            case 0: {
                                this.partie1 = s[18] + s[13] + " " + s[11] + s[16];
                                break block0;
                            }
                            case 6: {
                                this.partie1 = s[11] + s[13] + " " + s[18] + s[13] + " " + s[11] + s[16];
                                break block0;
                            }
                            case 8: {
                                this.partie1 = s[11] + s[14] + " " + s[18] + s[13] + " " + s[11] + s[16];
                                break block0;
                            }
                            case 9: {
                                this.partie1 = s[11] + s[15] + " " + s[18] + s[13] + " " + s[11] + s[16];
                                break block0;
                            }
                        }
                        this.partie1 = s[11] + s[bac] + " " + s[18] + s[13] + " " + s[11] + s[16];
                        break block0;
                    }
                    case 8: {
                        switch (bac) {
                            case 0: {
                                this.partie1 = s[18] + s[14] + " " + s[11] + s[16];
                                break block0;
                            }
                            case 6: {
                                this.partie1 = s[11] + s[13] + " " + s[18] + s[14] + " " + s[11] + s[16];
                                break block0;
                            }
                            case 8: {
                                this.partie1 = s[11] + s[14] + " " + s[18] + s[14] + " " + s[11] + s[16];
                                break block0;
                            }
                            case 9: {
                                this.partie1 = s[11] + s[15] + " " + s[18] + s[14] + " " + s[11] + s[16];
                                break block0;
                            }
                        }
                        this.partie1 = s[11] + s[bac] + " " + s[18] + s[14] + " " + s[11] + s[16];
                        break block0;
                    }
                    case 9: {
                        switch (bac) {
                            case 0: {
                                this.partie1 = s[18] + s[15] + " " + s[11] + s[16];
                                break block0;
                            }
                            case 6: {
                                this.partie1 = s[11] + s[13] + " " + s[18] + s[15] + " " + s[11] + s[16];
                                break block0;
                            }
                            case 8: {
                                this.partie1 = s[11] + s[14] + " " + s[18] + s[15] + " " + s[11] + s[16];
                                break block0;
                            }
                            case 9: {
                                this.partie1 = s[11] + s[15] + " " + s[18] + s[15] + " " + s[11] + s[16];
                                break block0;
                            }
                        }
                        this.partie1 = s[11] + s[bac] + " " + s[18] + s[15] + " " + s[11] + s[16];
                        break block0;
                    }
                }
                switch (bac) {
                    case 0: {
                        this.partie1 = s[18] + s[mid] + " " + s[11] + s[16];
                        break block0;
                    }
                    case 6: {
                        this.partie1 = s[11] + s[13] + " " + s[18] + s[mid] + " " + s[11] + s[16];
                        break block0;
                    }
                    case 8: {
                        this.partie1 = s[11] + s[14] + " " + s[18] + s[mid] + " " + s[11] + s[16];
                        break block0;
                    }
                    case 9: {
                        this.partie1 = s[11] + s[15] + " " + s[18] + s[mid] + " " + s[11] + s[16];
                        break block0;
                    }
                }
                this.partie1 = s[11] + s[bac] + " " + s[18] + s[mid] + " " + s[11] + s[16];
                break;
            }
            case 6: {
                switch (mid) {
                    case 0: {
                        switch (bac) {
                            case 0: {
                                this.partie1 = s[11] + s[13];
                                break block0;
                            }
                            case 6: {
                                this.partie1 = "ntog" + s[19] + " " + s[11] + s[13];
                                break block0;
                            }
                            case 8: {
                                this.partie1 = "fom" + s[19] + " " + s[11] + s[13];
                                break block0;
                            }
                        }
                        this.partie1 = s[bac] + s[19] + " " + s[11] + s[13];
                        break block0;
                    }
                    case 1: {
                        switch (bac) {
                            case 0: {
                                this.partie1 = s[17] + " " + s[11] + s[13];
                                break block0;
                            }
                            case 6: {
                                this.partie1 = s[11] + s[13] + " " + s[17] + " " + s[11] + s[13];
                                break block0;
                            }
                            case 8: {
                                this.partie1 = s[11] + s[14] + " " + s[17] + " " + s[11] + s[13];
                                break block0;
                            }
                            case 9: {
                                this.partie1 = s[11] + s[15] + " " + s[17] + " " + s[11] + s[13];
                                break block0;
                            }
                        }
                        this.partie1 = s[11] + s[bac] + " " + s[17] + " " + s[11] + s[13];
                        break block0;
                    }
                    case 6: {
                        switch (bac) {
                            case 0: {
                                this.partie1 = s[18] + s[13] + " " + s[11] + s[13];
                                break block0;
                            }
                            case 6: {
                                this.partie1 = s[11] + s[13] + " " + s[18] + s[13] + " " + s[11] + s[13];
                                break block0;
                            }
                            case 8: {
                                this.partie1 = s[11] + s[14] + " " + s[18] + s[13] + " " + s[11] + s[13];
                                break block0;
                            }
                            case 9: {
                                this.partie1 = s[11] + s[15] + " " + s[18] + s[13] + " " + s[11] + s[13];
                                break block0;
                            }
                        }
                        this.partie1 = s[11] + s[bac] + " " + s[18] + s[13] + " " + s[11] + s[13];
                        break block0;
                    }
                    case 8: {
                        switch (bac) {
                            case 0: {
                                this.partie1 = s[18] + s[14] + " " + s[11] + s[13];
                                break block0;
                            }
                            case 6: {
                                this.partie1 = s[11] + s[13] + " " + s[18] + s[14] + " " + s[11] + s[13];
                                break block0;
                            }
                            case 8: {
                                this.partie1 = s[11] + s[14] + " " + s[18] + s[14] + " " + s[11] + s[13];
                                break block0;
                            }
                            case 9: {
                                this.partie1 = s[11] + s[15] + " " + s[18] + s[14] + " " + s[11] + s[13];
                                break block0;
                            }
                        }
                        this.partie1 = s[11] + s[bac] + " " + s[18] + s[14] + " " + s[11] + s[13];
                        break block0;
                    }
                    case 9: {
                        switch (bac) {
                            case 0: {
                                this.partie1 = s[18] + s[15] + " " + s[11] + s[13];
                                break block0;
                            }
                            case 6: {
                                this.partie1 = s[11] + s[13] + " " + s[18] + s[15] + " " + s[11] + s[13];
                                break block0;
                            }
                            case 8: {
                                this.partie1 = s[11] + s[14] + " " + s[18] + s[15] + " " + s[11] + s[13];
                                break block0;
                            }
                            case 9: {
                                this.partie1 = s[11] + s[15] + " " + s[18] + s[15] + " " + s[11] + s[13];
                                break block0;
                            }
                        }
                        this.partie1 = s[11] + s[bac] + " " + s[18] + s[15] + " " + s[11] + s[13];
                        break block0;
                    }
                }
                switch (bac) {
                    case 0: {
                        this.partie1 = s[18] + s[mid] + " " + s[11] + s[head];
                        break block0;
                    }
                    case 6: {
                        this.partie1 = s[11] + s[13] + " " + s[18] + s[mid] + " " + s[11] + s[13];
                        break block0;
                    }
                    case 8: {
                        this.partie1 = s[11] + s[14] + " " + s[18] + s[mid] + " " + s[11] + s[13];
                        break block0;
                    }
                    case 9: {
                        this.partie1 = s[11] + s[15] + " " + s[18] + s[mid] + " " + s[11] + s[13];
                        break block0;
                    }
                }
                this.partie1 = s[11] + s[bac] + " " + s[18] + s[mid] + " " + s[11] + s[13];
                break;
            }
            case 8: {
                switch (mid) {
                    case 0: {
                        switch (bac) {
                            case 0: {
                                this.partie1 = s[11] + s[14];
                                break block0;
                            }
                            case 6: {
                                this.partie1 = "ntog" + s[19] + " " + s[11] + s[14];
                                break block0;
                            }
                            case 8: {
                                this.partie1 = "fom" + s[19] + " " + s[11] + s[14];
                                break block0;
                            }
                        }
                        this.partie1 = s[bac] + s[19] + " " + s[11] + s[14];
                        break block0;
                    }
                    case 1: {
                        switch (bac) {
                            case 0: {
                                this.partie1 = s[17] + " " + s[11] + s[14];
                                break block0;
                            }
                            case 6: {
                                this.partie1 = s[11] + s[13] + " " + s[17] + " " + s[11] + s[14];
                                break block0;
                            }
                            case 8: {
                                this.partie1 = s[11] + s[14] + " " + s[17] + " " + s[11] + s[14];
                                break block0;
                            }
                            case 9: {
                                this.partie1 = s[11] + s[15] + " " + s[17] + " " + s[11] + s[14];
                                break block0;
                            }
                        }
                        this.partie1 = s[11] + s[bac] + " " + s[17] + " " + s[11] + s[14];
                        break block0;
                    }
                    case 6: {
                        switch (bac) {
                            case 0: {
                                this.partie1 = s[18] + s[13] + " " + s[11] + s[14];
                                break block0;
                            }
                            case 6: {
                                this.partie1 = s[11] + s[13] + " " + s[18] + s[13] + " " + s[11] + s[14];
                                break block0;
                            }
                            case 8: {
                                this.partie1 = s[11] + s[14] + " " + s[18] + s[13] + " " + s[11] + s[14];
                                break block0;
                            }
                            case 9: {
                                this.partie1 = s[11] + s[15] + " " + s[18] + s[13] + " " + s[11] + s[14];
                                break block0;
                            }
                        }
                        this.partie1 = s[11] + s[bac] + " " + s[18] + s[13] + " " + s[11] + s[14];
                        break block0;
                    }
                    case 8: {
                        switch (bac) {
                            case 0: {
                                this.partie1 = s[18] + s[14] + " " + s[11] + s[14];
                                break block0;
                            }
                            case 6: {
                                this.partie1 = s[11] + s[13] + " " + s[18] + s[14] + " " + s[11] + s[14];
                                break block0;
                            }
                            case 8: {
                                this.partie1 = s[11] + s[14] + " " + s[18] + s[14] + " " + s[11] + s[14];
                                break block0;
                            }
                            case 9: {
                                this.partie1 = s[11] + s[15] + " " + s[18] + s[14] + " " + s[11] + s[14];
                                break block0;
                            }
                        }
                        this.partie1 = s[11] + s[bac] + " " + s[18] + s[14] + " " + s[11] + s[14];
                        break block0;
                    }
                    case 9: {
                        switch (bac) {
                            case 0: {
                                this.partie1 = s[18] + s[15] + " " + s[11] + s[head];
                                break block0;
                            }
                            case 6: {
                                this.partie1 = s[11] + s[13] + " " + s[18] + s[15] + " " + s[11] + s[14];
                                break block0;
                            }
                            case 8: {
                                this.partie1 = s[11] + s[14] + " " + s[18] + s[15] + " " + s[11] + s[14];
                                break block0;
                            }
                            case 9: {
                                this.partie1 = s[11] + s[15] + " " + s[18] + s[15] + " " + s[11] + s[14];
                                break block0;
                            }
                        }
                        this.partie1 = s[11] + s[bac] + " " + s[18] + s[15] + " " + s[11] + s[14];
                        break block0;
                    }
                }
                switch (bac) {
                    case 0: {
                        this.partie1 = s[18] + s[mid] + " " + s[11] + s[head];
                        break block0;
                    }
                    case 6: {
                        this.partie1 = s[11] + s[13] + " " + s[18] + s[mid] + " " + s[11] + s[14];
                        break block0;
                    }
                    case 8: {
                        this.partie1 = s[11] + s[14] + " " + s[18] + s[mid] + " " + s[11] + s[14];
                        break block0;
                    }
                    case 9: {
                        this.partie1 = s[11] + s[15] + " " + s[18] + s[mid] + " " + s[11] + s[14];
                        break block0;
                    }
                }
                this.partie1 = s[11] + s[bac] + " " + s[18] + s[mid] + " " + s[11] + s[14];
                break;
            }
            default: {
                switch (mid) {
                    case 0: {
                        switch (bac) {
                            case 0: {
                                this.partie1 = s[11] + s[16];
                                break block0;
                            }
                            case 6: {
                                this.partie1 = "ntog" + s[19] + " " + s[11] + s[head];
                                break block0;
                            }
                            case 8: {
                                this.partie1 = "fom" + s[19] + " " + s[11] + s[head];
                                break block0;
                            }
                        }
                        this.partie1 = s[bac] + s[19] + " " + s[11] + s[head];
                        break block0;
                    }
                    case 1: {
                        switch (bac) {
                            case 0: {
                                this.partie1 = s[17] + " " + s[11] + s[16];
                                break block0;
                            }
                            case 6: {
                                this.partie1 = s[11] + s[13] + " " + s[17] + " " + s[11] + s[head];
                                break block0;
                            }
                            case 8: {
                                this.partie1 = s[11] + s[14] + " " + s[17] + " " + s[11] + s[head];
                                break block0;
                            }
                            case 9: {
                                this.partie1 = s[11] + s[15] + " " + s[17] + " " + s[11] + s[head];
                                break block0;
                            }
                        }
                        this.partie1 = s[11] + s[bac] + " " + s[17] + " " + s[11] + s[head];
                        break block0;
                    }
                    case 6: {
                        switch (bac) {
                            case 0: {
                                this.partie1 = s[18] + s[13] + " " + s[11] + s[16];
                                break block0;
                            }
                            case 6: {
                                this.partie1 = s[11] + s[13] + " " + s[18] + s[13] + " " + s[11] + s[head];
                                break block0;
                            }
                            case 8: {
                                this.partie1 = s[11] + s[14] + " " + s[18] + s[13] + " " + s[11] + s[head];
                                break block0;
                            }
                            case 9: {
                                this.partie1 = s[11] + s[15] + " " + s[18] + s[13] + " " + s[11] + s[head];
                                break block0;
                            }
                        }
                        this.partie1 = s[11] + s[bac] + " " + s[18] + s[13] + " " + s[11] + s[head];
                        break block0;
                    }
                    case 8: {
                        switch (bac) {
                            case 0: {
                                this.partie1 = s[18] + s[14] + " " + s[11] + s[16];
                                break block0;
                            }
                            case 6: {
                                this.partie1 = s[11] + s[13] + " " + s[18] + s[14] + " " + s[11] + s[head];
                                break block0;
                            }
                            case 8: {
                                this.partie1 = s[11] + s[14] + " " + s[18] + s[14] + " " + s[11] + s[head];
                                break block0;
                            }
                            case 9: {
                                this.partie1 = s[11] + s[15] + " " + s[18] + s[14] + " " + s[11] + s[head];
                                break block0;
                            }
                        }
                        this.partie1 = s[11] + s[bac] + " " + s[18] + s[14] + " " + s[11] + s[head];
                        break block0;
                    }
                    case 9: {
                        switch (bac) {
                            case 0: {
                                this.partie1 = s[18] + s[15] + " " + s[11] + s[16];
                                break block0;
                            }
                            case 6: {
                                this.partie1 = s[11] + s[13] + " " + s[18] + s[15] + " " + s[11] + s[head];
                                break block0;
                            }
                            case 8: {
                                this.partie1 = s[11] + s[14] + " " + s[18] + s[15] + " " + s[11] + s[head];
                                break block0;
                            }
                            case 9: {
                                this.partie1 = s[11] + s[15] + " " + s[18] + s[15] + " " + s[11] + s[head];
                                break block0;
                            }
                        }
                        this.partie1 = s[11] + s[bac] + " " + s[18] + s[15] + " " + s[11] + s[head];
                        break block0;
                    }
                }
                switch (bac) {
                    case 0: {
                        this.partie1 = s[18] + s[mid] + " " + s[11] + s[head];
                        break block0;
                    }
                    case 6: {
                        this.partie1 = s[11] + s[13] + " " + s[18] + s[mid] + " " + s[11] + s[head];
                        break block0;
                    }
                    case 8: {
                        this.partie1 = s[11] + s[14] + " " + s[18] + s[mid] + " " + s[11] + s[head];
                        break block0;
                    }
                    case 9: {
                        this.partie1 = s[11] + s[15] + " " + s[18] + s[mid] + " " + s[11] + s[head];
                        break block0;
                    }
                }
                this.partie1 = s[11] + s[bac] + " " + s[18] + s[mid] + " " + s[11] + s[head];
            }
        }
    }

    public void translate4(String[] s, String b) {
        int con = Integer.parseInt(b);
        String a = String.valueOf(con);
        String part1 = null;
        String part2 = null;
        if ("1000".equals(a)) {
            this.Total = "nca\ua78c";
        }
        switch (a.length()) {
            case 4: {
                part1 = a.substring(1);
                part2 = a.substring(0, 1);
                this.translationpart1(s, part1);
                if ("1".equals(part2)) {
                    this.Total = this.partie1 + "  nca\ua78c";
                    break;
                }
                this.translate1(s, part2);
                this.Total = this.partie1 + "  nca\ua78c" + this.unchifre;
                break;
            }
            case 5: {
                part1 = a.substring(2);
                part2 = a.substring(0, 2);
                this.translationpart1(s, part1);
                this.translate2(s, part2);
                this.Total = this.partie1 + "  nca\ua78c" + this.deuxchifre;
                break;
            }
            case 6: {
                part1 = a.substring(3);
                part2 = a.substring(0, 3);
                this.translationpart1(s, part1);
                this.translate3(s, part2);
                this.Total = this.partie1 + "  nca\ua78c" + this.Troichifre;
                break;
            }
            default: {
                this.translate3(s, a);
                this.Total = this.Troichifre;
            }
        }
    }

    public static void main(String[] args) {
        try {
            for (UIManager.LookAndFeelInfo info : UIManager.getInstalledLookAndFeels()) {
                if (!"Nimbus".equals(info.getName())) continue;
                UIManager.setLookAndFeel(info.getClassName());
                break;
            }
        }
        catch (ClassNotFoundException ex) {
            Logger.getLogger(conte_med.class.getName()).log(Level.SEVERE, null, ex);
        }
        catch (InstantiationException ex) {
            Logger.getLogger(conte_med.class.getName()).log(Level.SEVERE, null, ex);
        }
        catch (IllegalAccessException ex) {
            Logger.getLogger(conte_med.class.getName()).log(Level.SEVERE, null, ex);
        }
        catch (UnsupportedLookAndFeelException ex) {
            Logger.getLogger(conte_med.class.getName()).log(Level.SEVERE, null, ex);
        }
        EventQueue.invokeLater(new Runnable(){

            @Override
            public void run() {
                new conte_med().setVisible(true);
            }
        });
    }
}
