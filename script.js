    // Download-Funktion
    function downloadStueckliste() {
      const { teileliste, preis } = berechnePreis();
      const laenge = teileliste.laenge;
      const breite = teileliste.breite;

      // Konfigurations-Flags
      const config = {
        spindel_11kw: teileliste.spindel === "1.1",
        spindel_22kw: teileliste.spindel === "2.2",
        vakuumplatte: teileliste.vakuumplatte === "Ja",
        absaugung: teileliste.absaugung === "Absaugungseinheit",
        steuerung: teileliste.steuerung === "Schaltschrank",
        KUS: teileliste.antrieb === "Kugelumlaufspindel",
        Riemen: teileliste.antrieb === "Riementrieb",
        servomotor: teileliste.motor === "Servomotor",
        schrittmotor: teileliste.motor === "Closed-Loop Schrittmotor"
      };


      // CSV-Erstellung
      const headers = ["Baugruppe", "Untergruppe", "Position", "Bezeichnung", "Anzahl", "Bemerkung"];
      const csvRows = [headers.join(";")];

      stueckliste.forEach(zeile => {
        csvRows.push(zeile.join(";"));
      });

      const csvContent = csvRows.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "stueckliste.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    // Preisberechnung
    function berechnePreis() {
      const laenge = parseInt(document.getElementById("länge").value);
      const breite = parseInt(document.getElementById("breite").value);

      const spindelWert = document.getElementById("Spindel").value;
      const spindelPreis = spindelWert === "1.1" ? 150 : spindelWert === "2.2" ? 250 : 0;

      const steuerungWert = document.getElementById("Steuerung").value;
      const steuerungPreis = steuerungWert === "Schaltschrank" ? 1000 : 0;

      const motorWert = document.getElementById("Motor").value;
      const motorPreis = motorWert === "Servomotor" ? 425 : motorWert === "Closed-Loop Schrittmotor" ? 475 : 0;

      const vakuumplatteWert = document.getElementById("Vakuumplatte").value;
      const vakuumplattePreis = vakuumplatteWert === "Ja" ? 50 : 0;

      const absaugungWert = document.getElementById("Absaugung").value;
      const absaugungPreis = absaugungWert === "Absaugungseinheit" ? 135 : 0;

      const antriebWert = document.getElementById("Antrieb").value;
      const antriebPreis = antriebWert === "Kugelumlaufspindel" ? 525 : 0;

      const grundbetrag = 2615;
      const preis = grundbetrag +
        ((breite / 100) - 5) * 60 +
        ((laenge / 100) - 5) * 40 +
        steuerungPreis + motorPreis + vakuumplattePreis + absaugungPreis + antriebPreis + spindelPreis;

     document.getElementById("preis").textContent = `${preis.toFixed(2)} €`;


      return {
        preis,
        teileliste: {
          laenge,
          breite,
          spindel: spindelWert === "ohne" ? "Keine Spindel beinhaltet" : spindelWert,
          steuerung: steuerungWert === "nichts" ? "Keine Steuerung beinhaltet" : steuerungWert,
          vakuumplatte: vakuumplatteWert === "Nein" ? "Keine Vakuumplatte beinhaltet" : vakuumplatteWert,
          absaugung: absaugungWert === "Ohne" ? "Keine Absaugung" : absaugungWert,
          antrieb: antriebWert,
          motor: motorWert === "ohne" ? "Kein Motor beinhaltet" : motorWert
        }
      };
    }

    // Bilder aktualisieren
    function aktualisiereBilder() {
      const githubBaseUrl = "https://raw.githubusercontent.com/ModTech-CNC4Home/Modelviewer/main/bilder/";
      const spindel = document.getElementById("Spindel").value;
      const steuerung = document.getElementById("Steuerung").value;
      const vakuumplatte = document.getElementById("Vakuumplatte").value;
      const absaugung = document.getElementById("Absaugung").value;
      const antrieb = document.getElementById("Antrieb").value;
      const motor = document.getElementById("Motor").value;

      const XY_Achse = document.getElementById("XY_Achse");
      const SpindelBild = document.getElementById("SpindelBild");
      const SteuerungBild = document.getElementById("SteuerungBild");
      const VakuumplatteBild = document.getElementById("VakuumplatteBild");
      const AbsaugungBild = document.getElementById("AbsaugungBild");
      const AntriebBild = document.getElementById("AntriebBild");
      const MotorBild = document.getElementById("MotorBild");

      // XY-Achse Definition
      XY_Achse.src = githubBaseUrl + "XY_Achse.png";
      XY_Achse.style.display = "block";

      // Spindel
      if (spindel === "1.1") {
        SpindelBild.src = githubBaseUrl + "spindel_1_1kw.png";
        SpindelBild.style.display = "block";
      } else if (spindel === "2.2") {
        SpindelBild.src = githubBaseUrl + "spindel_2_2kw.png";
        SpindelBild.style.display = "block";
      } else {
        SpindelBild.src = githubBaseUrl + "ohne_spindel.png";
        SpindelBild.style.display = "block";
      }

      // Steuerung
      if (steuerung === "Schaltschrank") {
        SteuerungBild.src = githubBaseUrl + "Schaltschrank.jpeg";
        SteuerungBild.style.display = "block";
      } else {
        SteuerungBild.style.display = "none";
      }

      // Vakuumplatte
      if (vakuumplatte === "Ja") {
        VakuumplatteBild.src = githubBaseUrl + "Vakuumplatte.png";
        VakuumplatteBild.style.display = "block";
      } else {
        VakuumplatteBild.src = githubBaseUrl + "ohne_Vakuumplatte.png";
        VakuumplatteBild.style.display = "block";
      }

      // Absaugung
      if (absaugung === "Absaugungseinheit") {
        AbsaugungBild.src = githubBaseUrl + "Absaugungseinheit.png";
        AbsaugungBild.style.display = "block";
      } else {
        AbsaugungBild.src = githubBaseUrl + "ohne_Absaugungseinheit.png";
        AbsaugungBild.style.display = "block";
      }

      // Antrieb
      if (antrieb === "Riementrieb") {
        AntriebBild.src = githubBaseUrl + "Riementrieb.jpg";
        AntriebBild.style.display = "block";
      } else if (antrieb === "Kugelumlaufspindel") {
        AntriebBild.src = githubBaseUrl + "Kugelumlaufspindel.jpg";
        AntriebBild.style.display = "block";
      } else {
        AntriebBild.style.display = "none";
      }

      // Motor
      if (motor === "Servomotor") {
        MotorBild.src = githubBaseUrl + "Servomotor.png";
        MotorBild.style.display = "block";
      } else if (motor === "Closed-Loop Schrittmotor") {
        MotorBild.src = githubBaseUrl + "Schrittmotor.png";
        MotorBild.style.display = "block";
      } else {
        MotorBild.style.display = "none";
      }
    }

    document.addEventListener("DOMContentLoaded", () => {
      berechnePreis();
      aktualisiereBilder();

      document.querySelectorAll("select").forEach(select => {
        select.addEventListener("change", () => {
        aktualisiereBilder();
        berechnePreis();
        });
      });

      document.getElementById("Downloadbutton").addEventListener("click", downloadStueckliste);
    });
  function downloadStueckliste() {
  try {
    const { teileliste, preis } = berechnePreis();
    const laenge = parseInt(teileliste.laenge);
    const breite = parseInt(teileliste.breite);

    if (isNaN(laenge) || isNaN(breite)) {
      console.error("Ungültige Werte für Länge oder Breite.");
      alert("Die Werte für Länge oder Breite sind ungültig. Bitte überprüfen Sie Ihre Eingaben.");
      return;
    }

    const config = {
      spindel_11kw: teileliste.spindel === "1.1",
      spindel_22kw: teileliste.spindel === "2.2",
      vakuumplatte: teileliste.vakuumplatte === "Ja",
      absaugung: teileliste.absaugung === "Absaugungseinheit",
      steuerung: teileliste.steuerung === "Schaltschrank",
      KUS: teileliste.antrieb === "Kugelumlaufspindel",
      Riemen: teileliste.antrieb === "Riementrieb",
      servomotor: teileliste.motor === "Servomotor", 
      schrittmotor: teileliste.motor === "Schrittmotor"
    };

    // Definition der Gruppen, die später in die CSV übernommen werden
    const gruppen = {
      linearfuehrung: [
        ["CNC-Portal", "Linearfürhung", "001", "KUGELSCHIENE_CS_KSE_020_SNS_H", "2", "Länge: 300mm"],
        ["CNC-Portal", "Linearfürhung", "002", "KUGELSCHIENE_CS_KSE_025_SNS_H_", "2", "Länge: " + (breite + 200)],
        ["CNC-Portal", "Linearfürhung", "003", "KUGELSCHIENE_CS_KSE_025_SNS_H_", "2", "Länge: " + (laenge + 200)],
        ["CNC-Portal", "Linearfürhung", "004", "KWE_020_SNS_CS_C1_H", "4", ""],
        ["CNC-Portal", "Linearfürhung", "005", "KWE_025_SNS_CS_C1_H", "8", ""]
      ],
      verschraubung: [
        ["CNC-Portal", "Verschraubung", "006", "Zylinderkopfschraube M3x16", "20", ""],
		["CNC-Portal", "Verschraubung", "007", "Zylinderkopfschraube M5x16", "20", ""],
		["CNC-Portal", "Verschraubung", "008", "Zylinderkopfschraube M5x22", "40", ""],
		["CNC-Portal", "Verschraubung", "009", "Zylinderkopfschraube M6x16", "20", ""],
		["CNC-Portal", "Verschraubung", "010", "Zylinderkopfschraube M6x20", "10", ""],
		["CNC-Portal", "Verschraubung", "011", "Zylinderkopfschraube M6x22", "110", ""],
		["CNC-Portal", "Verschraubung", "012", "Zylinderkopfschraube M6x25", "15", ""],
		["CNC-Portal", "Verschraubung", "013", "Zylinderkopfschraube M6x30", "5", ""],
		["CNC-Portal", "Verschraubung", "014", "Zylinderkopfschraube M6x35", "10", ""],
		["CNC-Portal", "Verschraubung", "015", "Zylinderkopfschraube M6x40", "10", ""],
		["CNC-Portal", "Verschraubung", "016", "Zylinderkopfschraube M6x50", "30", "Vollgewinde"],
		["CNC-Portal", "Verschraubung", "017", "Zylinderkopfschraube M6x55", "10", ""],
		["CNC-Portal", "Verschraubung", "018", "Zylinderkopfschraube M8x16", "10", ""],
		["CNC-Portal", "Verschraubung", "019", "Zylinderkopfschraube M8x20", "15", ""],
		["CNC-Portal", "Verschraubung", "020", "Zylinderkopfschraube M8x22", "40", ""],
		["CNC-Portal", "Verschraubung", "021", "Zylinderkopfschraube M8x30", "30", ""],
		["CNC-Portal", "Verschraubung", "022", "Linsenkopfschraube M8x16", "40", ""],
		["CNC-Portal", "Verschraubung", "023", "Unterlagscheibe M3", "20", ""],
		["CNC-Portal", "Verschraubung", "024", "Unterlagscheibe M5", "45", ""],
		["CNC-Portal", "Verschraubung", "025", "Unterlagscheibe M6", "80", ""],
		["CNC-Portal", "Verschraubung", "026", "Unterlagscheibe M8", "80", ""],
		["CNC-Portal", "Verschraubung", "027", "Mutter M5", "20", "selbstsichernd"],
		["CNC-Portal", "Verschraubung", "028", "Mutter M6", "15", "selbstsichern, hoch"],
		["CNC-Portal", "Verschraubung", "029", "Ramp-Muffe M8x15", "25", ""],
		["CNC-Portal", "Verschraubung", "030", "Ramp-Muffe M8x20", "15", ""]
		],
      aluprofil: [
		["CNC-Portal", "Alu-Profil", "031", "Aluprofil 40x40", "6", "Länge: 80mm"],
		["CNC-Portal", "Alu-Profil", "032", "Aluprofil 40x40", "3", "Länge: " + (laenge + 202)],
		["CNC-Portal", "Alu-Profil", "033", "Aluprofil 40x40", "2", "Länge: " + (laenge + 202)],
		["CNC-Portal", "Alu-Profil", "034", "Aluprofil 40x40", "2", "Länge: " + (breite + 451.5)],
		["CNC-Portal", "Alu-Profil", "035", "Aluprofil 80x40", "2", "Länge: " + (laenge + 202)],
		["CNC-Portal", "Alu-Profil", "036", "Aluprofil 80x40", "2", "Länge: " + (breite + 451.5)],
		["CNC-Portal", "Alu-Profil", "037", "Endkappe 40x40 S", "4",""],
		["CNC-Portal", "Alu-Profil", "038", "Nutenstein M6", "100", ""],
		["CNC-Portal", "Alu-Profil", "039", "Nutenstein M8", "110", ""],
		["CNC-Portal", "Alu-Profil", "040", "Automatikverbinder", "30", "Set"],
		["CNC-Portal", "Alu-Profil", "041", "Winekl 80", "4", "Set"],
		["CNC-Portal", "Alu-Profil", "042", "Winkel 80", "1", ""],
		["CNC-Portal", "Alu-Profil", "043", "Winkeldeckel 80", "1", ""],
		["CNC-Portal", "Alu-Profil", "044", "Winkel 40", "1", ""],
		["CNC-Portal", "Alu-Profil", "045", "Winkeldeckel 40", "1", ""]
		  ],
      "3Ddruck": [
        ["CNC-Portal", "3D-Druck", "046", "Anschlag VL/HR/PR", "3", ""],
		["CNC-Portal", "3D-Druck", "047", "Anschlag VR/HL/PL", "3", ""],
		["CNC-Portal", "3D-Druck", "048", "Anschlag Deckel VL/HR/PR", "3", ""],
		["CNC-Portal", "3D-Druck", "049", "Anschlag Deckel VR/HL/PL", "3", ""],
		["CNC-Portal", "3D-Druck", "050", "Anschlag Z/oben", "1", ""],
		["CNC-Portal", "3D-Druck", "051", "Anschlag Z/unten ", "1", ""],
		["CNC-Portal", "3D-Druck", "052", "Kabelschlepp-S", "2", ""],
		["CNC-Portal", "3D-Druck", "053", "Kabelschlepp-PE", "1", ""],
		["CNC-Portal", "3D-Druck", "054", "Stehloslager-Halter X", "1", ""],
		["CNC-Portal", "3D-Druck", "055", "Stehloslager-Halter Y ", "2", ""],
		["CNC-Portal", "3D-Druck", "056", "Endkappe 80x40", "4", ""],
		["CNC-Portal", "3D-Druck", "057", "Motor-Halter YL", "1", ""],
		["CNC-Portal", "3D-Druck", "058", "Motor-Halter YR", "1", ""],
		["CNC-Portal", "3D-Druck", "059", "Motor-Halter X", "1", ""],
		["CNC-Portal", "3D-Druck", "060", "Motor-Halter Z", "1", ""],
		["CNC-Portal", "3D-Druck", "061", "LED Montageblock", "2", ""]
		  ],
      frästeile: [
        ["CNC-Portal", "Frästeile", "062", "Portalwange Links", "1", ""],
		["CNC-Portal", "Frästeile", "063", "Portalwange Rechts", "1", ""],
		["CNC-Portal", "Frästeile", "064", "Z-Platte", "1", ""],
		["CNC-Portal", "Frästeile", "065", "Adapter Z-Achse", "1", ""],
		["CNC-Portal", "Frästeile", "066", "Distanzblock X", "1", ""]
      ],
      platten: [
        ["CNC-Portal", "Platten", "067", "Grundplatte", "1", ""],
        ["CNC-Portal", "Platten", "068", "Opferplatte-Hinten", "1", ""],
        ["CNC-Portal", "Platten", "069", "Opferplatte-Vorne", "1", ""],
        ["CNC-Portal", "Platten", "070", "Opferplatte-Inlay", "1", ""]
      ],
      belecuhtung: [
        ["CNC-Portal", "Beleuchtung", "071", "LED-Halterung", "1", ""],
        ["CNC-Portal", "Beleuchtung", "072", "LED-Leuchtstreifen", "1", ""]
      ],
      sonstiges: [
        ["CNC-Portal", "sonstiges", "073", "Pulley 8mm", "3", ""],
        ["CNC-Portal", "sonstiges", "074", "Pulley 10mm", "3", ""],
        ["CNC-Portal", "sonstiges", "075", "Rundriemen (261-3M)", "3", ""],
        ["CNC-Portal", "sonstiges", "076", "Einschmelzmutttern M3x5 7", "20", ""],
        ["CNC-Portal", "sonstiges", "077", "Einschmelzmutttern M6x12.7", "10", ""],
        ["CNC-Portal", "sonstiges", "078", "Sensoren - CMV101D", "8", ""],
        ["CNC-Portal", "sonstiges", "079", "Kabelschlepp (E2.17.038.048.0) 1359-679,5 (52)", "1", ""],
        ["CNC-Portal", "sonstiges", "080", "Kabelschlepp (E2.17.038.048.0) 723,6-361,8 (31)", "1", ""]
      ],
      spindel_11kw: config.spindel_11kw ? [
        ["Spindel", "1.1KW", "081", "Spindel 1.1KW", "1", ""],
        ["Spindel", "1.1KW", "082", "Spindeplatte 1.1KW", "1", ""],
        ["Spindel", "1.1KW", "083", "Verbrauchsmaterial", "0", "In CNC-Portal enthalten"]
      ] : [],
      spindel_22kw: config.spindel_22kw ? [
        ["Spindel", "2.2KW", "084", "Verbrauchsmaterial", "0", "In CNC-Portal enthalten"],
        ["Spindel", "2.2KW", "085", "Spindel 2.2 KW", "1", ""],
        ["Spindel", "2.2KW", "086", "Spindelplatte 2.2 KW", "1", ""]
      ] : [],
      vakuumplatte: config.vakuumplatte ? [
        ["Vakuumplatte", "Vakuumplatte", "087", "Vakuumplatte", "1", ""],
        ["Vakuumplatte", "Vakuumplatte", "088", "Dichtschlauch", "1", ""]
      ] : [],
      steuerung: config.steuerung ? [
        ["Steuerung", "Schaltschrank", "089", "Schaltschrank", "1", ""],
        ["Steuerung", "Schaltschrank", "090", "Hutschiene", "3", ""],
        ["Steuerung", "Schaltschrank", "091", "Hauptschalter", "1", ""],
        ["Steuerung", "Schaltschrank", "092", "FI-Schalter", "1", ""],
        ["Steuerung", "Schaltschrank", "093", "Not Aus Schalter", "1", ""],
        ["Steuerung", "Schaltschrank", "094", "Netzteil 12 V", "1", ""],
        ["Steuerung", "Schaltschrank", "095", "Netzteil 36 V", "1", ""],
        ["Steuerung", "Schaltschrank", "096", "LS", "1", ""],
        ["Steuerung", "Schaltschrank", "097", "Lüfter", "1", ""],
        ["Steuerung", "Schaltschrank", "098", "Netzfilter", "1", ""],
        ["Steuerung", "Schaltschrank", "099", "Kabelkanal", "3", ""],
        ["Steuerung", "Schaltschrank", "100", "Steckdose", "3", ""],
        ["Steuerung", "Schaltschrank", "101", "Netzstecker", "1", ""],
        ["Steuerung", "Schaltschrank", "102", "Verbrauchsmaterial", "0", "Sonstiges Verbrauchsmaterial"]
      ] : [],
      absaugung: config.absaugung ? [
        ["Absaugung", "Verteiler", "103", "Anschlussstück", "3", ""],
        ["Absaugung", "Verteiler", "104", "Anschlussgegenstück", "3", ""],
        ["Absaugung", "Verteiler", "105", "Gerade Platte", "2", ""],
        ["Absaugung", "Verteiler", "106", "Schräge Platte", "2", ""],
        ["Absaugung", "Verteiler", "107", "Deckel", "2", ""],
        ["Absaugung", "Verteiler", "108", "Anschlussstopfen", "1", ""],
        ["Absaugung", "Verteiler", "109", "Schieber Deckel", "3", ""],
        ["Absaugung", "Verteiler", "110", "Schieber", "3", ""],
        ["Absaugung", "Verteiler", "111", "Gegenschieber", "3", ""],
        ["Absaugung", "Verteiler", "112", "Platzhalter außen", "2", ""],
        ["Absaugung", "Verteiler", "113", "Platzhalter innen", "2", ""],
        ["Absaugung", "Verteiler", "114", "Schelle", "1", ""],
        ["Absaugung", "Absaugung", "115", "E-Rib", "1", ""],
        ["Absaugung", "Absaugung", "116", "Wellenschlauch", "1", ""],
        ["Absaugung", "Absaugung", "117", "Feder", "1", ""],
        ["Absaugung", "Absaugung", "118", "DN Rohr 40", "1", ""],
        ["Absaugung", "Absaugung", "119", "3D-Druckteile", "1", "Nach Zeichnung"],
        ["Absaugung", "Absaugung", "120", "Gewindestange", "1", ""],
        ["Absaugung", "Absaugung", "121", "Bürstenleiste", "1", ""],
        ["Absaugung", "Absaugung", "122", "Magnete", "10", ""],
        ["Absaugung", "Absaugung", "123", "M6x35", "1", ""],
        ["Absaugung", "Absaugung", "124", "M6x100", "1", ""],
        ["Absaugung", "Absaugung", "125", "M6x60", "5", ""],
        ["Absaugung", "Absaugung", "126", "M6x45", "1", ""],
        ["Absaugung", "Absaugung", "127", "M6x30", "5", ""],
        ["Absaugung", "Absaugung", "128", "M4x20", "5", ""],
        ["Absaugung", "Absaugung", "129", "M4x14", "5", ""],
        ["Absaugung", "Absaugung", "130", "M10 Mutter", "5", ""],
        ["Absaugung", "Absaugung", "131", "M4 Mutter", "5", ""],
        ["Absaugung", "Absaugung", "132", "M6 Einschmelzmutter", "5", ""],
        ["Absaugung", "Absaugung", "133", "M6 Nutensteine", "5", ""],
        ["Absaugung", "Absaugung", "134", "M6 Unterlegscheibe", "5", ""],
        ["Absaugung", "Absaugung", "135", "M4 Unterlagscheiben", "10", ""]
      ] : [],
      KUS: config.KUS ? [
        ["Antrieb", "KUS", "136", "Kugelumlaufspindel Y", "1", "Länge: " + (laenge + 200)],
        ["Antrieb", "KUS", "137", "Kugelumlaufspindel X", "1", "Länge: " + (breite + 200)],
        ["Antrieb", "KUS", "138", "Kugelumlaufspindel Z", "1", "Länge: 300"]
      ] : [],
      Riemen: config.Riemen ? [
        ["Antrieb", "Riemen", "139", "Riemen", "3", "Länge muss angepasst werden"],
        ["Antrieb", "Riemen", "140", "Riemenspanner", "3", ""]
      ] : [],
      servomotor: config.servomotor ? [
        ["Motor", "Motor", "141", "Nema 23 Servomotor", "2", ""],
        ["Motor", "Motor", "142", "Nema 23 Closed Loop", "1", ""]
      ] : [],
      schrittmotor: config.schrittmotor ? [
        ["Motor", "Schrittmotor", "143", "Nema23 Schrittmotor", "3", ""]
      ] : []
    };

    const stueckliste = Object.values(gruppen).flat();

    const headers = ["Baugruppe", "Untergruppe", "Position", "Bezeichnung", "Anzahl", "Bemerkung"];
    const csvRows = [headers.join(";")];

    stueckliste.forEach(zeile => {
      csvRows.push(zeile.join(";"));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const date = new Date();
    const filename = `stueckliste_${date.getFullYear()}${("0" + (date.getMonth() + 1)).slice(-2)}${("0" + date.getDate()).slice(-2)}_${("0" + date.getHours()).slice(-2)}${("0" + date.getMinutes()).slice(-2)}${("0" + date.getSeconds()).slice(-2)}.csv`;

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert("Die Stückliste wurde erfolgreich heruntergeladen!");
  } catch (error) {
    console.error("Fehler beim Erstellen der Stückliste:", error);
    alert("Beim Erstellen der Stückliste ist ein Fehler aufgetreten!");
  }
}

  aktualisiereBilder();
  berechnePreis();
   document.getElementById("Downloadbutton").addEventListener("click", downloadStueckliste);
