#include <iostream>
#include <vector>
#include <fstream>
#include <algorithm>
#include <cstring>

using namespace std;

enum Id {header,credits,animation};

unsigned long long int binaryToDecimal(char* binary, int length)
{
    unsigned long long int decimal = 0;
    for(int i=length-1; 0 <=  i; --i) {
        decimal = decimal << 8;
        decimal += (unsigned char)binary[i];
    }
    return decimal;
}


class Pixel{
private:
    unsigned int Red;
    unsigned int Green;
    unsigned int Blue;

public:
    //constructor
    Pixel(unsigned int red, unsigned int green, unsigned int blue){
        Red = red;
        Green = green;
        Blue = blue;
    }

    unsigned int getRed() const {
        return Red;
    }

    void setRed(unsigned int red) {
        Red = red;
    }

    unsigned int getGreen() const {
        return Green;
    }

    void setGreen(unsigned int green) {
        Green = green;
    }

    unsigned int getBlue() const {
        return Blue;
    }

    void setBlue(unsigned int blue) {
        Blue = blue;
    }

    //destructor
    ~Pixel(){}
};

class Ciff{
private:

    //header
    string Magic;
    long long int Header_size;
    long long int Content_size;
    long long int Width;
    long long int Height;
    string Caption;
    vector<string> Tags;

    //content
    vector<Pixel> Pixels;

public:

    //constructor
    Ciff(){
    }

    //getter and setter
    const string &getMagic() const {
        return Magic;
    }

    void setMagic(const string &magic) {
        Magic = magic;
    }

    long long int getHeaderSize() const {
        return Header_size;
    }

    void setHeaderSize(long long int headerSize) {
        Header_size = headerSize;
    }

    long long int getContentSize() const {
        return Content_size;
    }

    void setContentSize(long long int contentSize) {
        Content_size = contentSize;
    }

    long long int getWidth() const {
        return Width;
    }

    void setWidth(long long int width) {
        Width = width;
    }

    long long int getHeight() const {
        return Height;
    }

    void setHeight(long long int height) {
        Height = height;
    }

    const string &getCaption() const {
        return Caption;
    }

    void setCaption(const string &caption) {
        Caption = caption;
    }

    const vector<string> &getTags() const {
        return Tags;
    }

    void setTags(const vector<string> &tags) {
        Tags = tags;
    }

    const vector<Pixel> &getPixels() const {
        return Pixels;
    }

    void setPixels(const vector<Pixel> &pixels) {
        Pixels = pixels;
    }

    void createPPM() {
        ofstream myfile;
        myfile.open("test.ppm");
        myfile << "P3" << endl;
        myfile << Width << endl;
        myfile << Height << endl;
        myfile << 255 << endl;

        for(Pixel pixel : Pixels ){
            myfile << pixel.getRed() << " " << pixel.getGreen() << " " << pixel.getBlue() << endl;
        }
        myfile.close();

    }

    void readContent(char *chars ) {
        for(int i = 0; i < Width * Height; ++i) {
            unsigned int rgb[3];
            for(int j = 0; j < 3; ++j) {
                rgb[j] = (unsigned char )*chars;
                chars++;
            }
            Pixels.push_back(Pixel(rgb[0], rgb[1], rgb[2]));
        }
    }

    //destructor
    ~Ciff(){}
};

class Caff{
private:

    //ID
    Id id;

    //header
    string Magic;
    long long int Header_size;
    long long int Num_anim;

    //credits
    short int Year;
    unsigned int Month;
    unsigned int Day;
    unsigned int Hour;
    unsigned int Minute;
    long long int Creator_len;
    string Creator;

    // animation
    long long int Duration;
    Ciff ciff;

public:

    //constructor
    Caff(){}

    //getter and setter
    enum Id getId() const {
        return id;
    }

    void setId(enum Id id) {
        this->id = id;
    }

    const string &getMagic() const {
        return Magic;
    }

    void setMagic(const string &magic) {
        Magic = magic;
    }

    long long int getHeaderSize() const {
        return Header_size;
    }

    void setHeaderSize(long long int headerSize) {
        Header_size = headerSize;
    }

    long long int getNumAnim() const {
        return Num_anim;
    }

    void setNumAnim(long long int numAnim) {
        Num_anim = numAnim;
    }

    short getYear() const {
        return Year;
    }

    void setYear(short year) {
        Year = year;
    }

    unsigned int getMonth() const {
        return Month;
    }

    void setMonth(unsigned int month) {
        Month = month;
    }

    unsigned int getDay() const {
        return Day;
    }

    void setDay(unsigned int day) {
        Day = day;
    }

    unsigned int getHour() const {
        return Hour;
    }

    void setHour(unsigned int hour) {
        Hour = hour;
    }

    unsigned int getMinute() const {
        return Minute;
    }

    void setMinute(unsigned int minute) {
        Minute = minute;
    }

    long long int getCreatorLen() const {
        return Creator_len;
    }

    void setCreatorLen(long long int creatorLen) {
        Creator_len = creatorLen;
    }

    const string &getCreator() const {
        return Creator;
    }

    void setCreator(const string &creator) {
        Creator = creator;
    }

    long long int getDuration() const {
        return Duration;
    }

    void setDuration(long long int duration) {
        Duration = duration;
    }

    const Ciff &getCiff() const {
        return ciff;
    }

    void setCiff(const Ciff &ciff) {
        Caff::ciff = ciff;
    }

    //read data
    int read_from_file(string file){

        char id[1];
        char length[8];

        std::ifstream is ("ss.caff", std::ifstream::binary);
        if (is) {
            is.read(id, sizeof(id));
            is.read(length, sizeof(length));

            //while(is.read(temp, sizeof(temp))) {

                int idx = (int) id[0];
                int decimal_length = 20;

            //binary array to decimal number :O
            // ezt normálisan meg kell írni
            printf("%d", decimal_length);


                switch (idx) {
                    case 1: {
                        //header
                        (printf("\negyes\n"));
                        int header_size = decimal_length;
                        char header[20];
                        is.read(header, sizeof(header));
                        for (int i = 0; i < sizeof(header); i++) {
                            printf("%i", header[i]);
                        }
                        printf("\n");

                        break;
                    }

                    case 2: {
                        //credits
                        int credits_size = (int) length[1];
                        //printf("%d", credits_size);
                        char credits[credits_size];
                        is.read(credits, sizeof(credits));

                        for (int i = 0; i <= sizeof(credits); i++) {
                            //printf("%c", credits[i]);
                        }

                        break;
                    }

                    case 3: {
                        break;
                    }
                    default: {
                        break;
                    }
                }

            //}

            /*// get length of file:
            is.seekg (0, is.end);
            int length = is.tellg();
            is.seekg (0, is.beg);

            // allocate memory:
            char * buffer = new char [length];

            // read data as a block:
            is.read (buffer,length);

            is.close();

            // print content:
            std::cout.write (buffer,length);*/

        }

        else{
            cout<<"haha";
        }

        return 0;
    }

    //write data

    //destructor
    ~Caff(){}
};

int main() {
    char pixels [12] = {0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255};
    Ciff ciff;
    ciff.setWidth(2);
    ciff.setHeight(2);
    ciff.readContent(pixels);
    ciff.createPPM();
    return 0;
}

// fájl beolvasása, és berakja osztályba CAFF, CIFF; bájtok szerinti sorrendben attribútom feltöltés, CIFF-ből képgenerálás, kell egy szöveges fájl, ami visszaadja a CAff és Ciff tartalmát