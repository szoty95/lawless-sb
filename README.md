# lawless-sb
Számítógép-biztonság házifeladat

Natív komponens TODO lista: C++

- file beolvasás megírás CAFF -> majdnem megvan, be kell fejezni a switch case-t és a hozzátartozó CIFF beolvasását
- file beolvasás adatok tárolása
- file adatok beolvasása CIFF
- file adatok tárolása CIFF

Nézzétek át a házi leírást, hátha kimaradt valami légyszi.

Hxd letöltés ajánlott, mert sokszor kell nézegetni a biteket, hogy pontosan melyik karaktert töltjük is be.
Fejlesztést Clion-ban kezdtem, min-Gwt használva.

Ami eddig megvan:
Elkészítettük a Caff és Ciff osztályokat és azok tagváltozóit, gettereket, settereket.
Elkezdtük a Caff beolvasó függvényét megírni, hosszas szenvedések árán megvan a formula, amivel értelmesen be lehet olvasni:
- első bájt egy azonosító(1 v 2 v 3)
- ezt követi egy 8 bájt hosszú hossz meghatározás (ezt tömbbe mentjük, TODO ezt a tömböt kell értelmesen egy darab decimális számmá varázsolni a memória megborítása nékül)
- ezek után csak egy while ciklusba kell rakni a dolgokat és a CIFF-ig be fogja olvasni, amit külön kell majd kezelni

Betettünk egy példa fájlt a csomagba, azon lehet gyakorolni a beolvasást.

Caff alapján a Ciff beolvasás már nem kéne nagy gondot jelentsen, ott a Tag-ek bekérése lesz még érdekes.
