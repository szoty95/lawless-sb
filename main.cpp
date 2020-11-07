#include <iostream>
#include <vector>
#include <fstream>
#include <algorithm>
#include <cstring>
#include <string>

using namespace std;

enum Id {header,credits,animation};

class Pixel{
private:
    unsigned int Red;
    unsigned int Green;
    unsigned int Blue;

public:
    //constructor
    Pixel(){}

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
    Ciff(){}

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

    //destructor
    ~Ciff(){}
};

class Caff{
private:

    //ID
    Id Id;

    //header
    string Magic;
    long long int Header_size;
    long long int Num_anim;

    bool header_read = false;

    //credits
    short int Year;
    unsigned int Month;
    unsigned int Day;
    unsigned int Hour;
    unsigned int Minute;
    long long int Creator_len;
    string Creator;
    bool credits_read = false;

    // animation
    long long int Duration;
    Ciff ciff;
    bool animations_read;

public:

    //constructor
    Caff(){}

    //getter and setter
    enum Id getId() const {
        return Id;
    }

    void setId(enum Id id) {
        Id = id;
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

    unsigned long long int binaryToDecimal(char* binary, int length)
    {
        unsigned long long int decimal = 0;
        for(int i=length-1; 0 <=  i; --i) {
            decimal = decimal << 8;
            decimal += (int)binary[i];
        }
        return decimal;
    }

    //read data
    int read_from_file(string file){



        std::ifstream is ("C:\\Users\\Geri\\CLionProjects\\lawless-sb\\ss.caff", std::ifstream::binary);

        if (is) {
            char id[1];
            char length[8];

            int lastID = 0;

            while( !is.eof()) {

                is.read(id, sizeof(id));
                is.read(length, sizeof(length));

                int idx = (int) id[0];

                unsigned long long int decimal_length = binaryToDecimal(length, sizeof(length));

                //binary array to decimal number :O
                // ezt normálisan meg kell írni
                // printf("%d", decimal_length);


                switch (idx) {
                    case 1: {
                        //header
                        std::cout<<"Header"<<endl;
                        if(lastID != 0){
                            cout<<"Wrong block order before Header";
                            // finish execution
                            break;
                        }
                        if(!header_read) {
                            char* header = new char[decimal_length];
                            is.read(header, decimal_length);
                            read_header(header, decimal_length);
                            header_read = true;
                            lastID = 1;
                            delete [] header;
                        } else {
                           printf("Header already presented!\n");
                        }

                        break;
                    }

                    case 2: {
                        //credits
                        std::cout << "Credits" << std::endl;
                       //printf("%d", credits_size);
                       if(lastID != 1){
                           cout<<"Wrong block order before Credits";
                           break;
                       }
                        if(!credits_read ) {
                            char* credits = new char[decimal_length];
                            is.read(credits, decimal_length);
                            read_credits(credits, decimal_length);
                            credits_read = true;
                            lastID = 2;
                            delete [] credits;
                        } else {
                            printf("Credits already presented!\n");
                        }

                        break;
                    }

                    case 3: {
                        if(lastID != 2 && lastID != 3){
                            cout<<"Wrong block order before Animations ";
                            break;
                        }
                        if(!animations_read) {
                            char* animations = new char[decimal_length];
                            is.read(animations, decimal_length);
                            read_animations(animations, decimal_length);
                            lastID = 3;
                            delete [] animations;
                        } else {
                            printf("Animations already presented!\n");
                        }
                        break;
                    }
                    default: {
                        break;
                    }
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

    void read_header(const char* chars, size_t length ){
        string magic;
        char h_length[8];
        char num_anim[8];

        for(int i = 0; i < length; i++){
            if( i < 4) {
               magic.append(1, chars[i]);
            }
            if(i>=4 && i <12){
                h_length[i-4] = chars[i];
            }

            if(i>=12 && i < length){
                num_anim[i-12] = chars[i];
            }
        }

        setMagic(magic);
        setHeaderSize(binaryToDecimal(h_length, sizeof(h_length)));
        setNumAnim(binaryToDecimal(num_anim, sizeof(num_anim)));
        std::cout<<Magic<<endl;
        std::cout<<Header_size<<endl;
        std::cout<<Num_anim<<endl;
    }

    void read_credits(char* chars, size_t length ) {
        char Y[2];
        char creator_length[8];
        string creator;

        Y[0] = chars[0];
        Y[1] = chars[1];
        setMonth(chars[2]);
        setDay(chars[3]);
        setHour(chars[4]);
        setMinute(chars[5]);
        setYear((short)binaryToDecimal(Y, 2));

        for(int i = 6; i < 14; i++){
            creator_length[i-6] = chars[i];
        }

        int c_length = (int)binaryToDecimal(creator_length, sizeof(creator_length));

        for(int i = 14; i < length; i++){
            creator.append(1, (char)chars[i]);
        }

        if(creator.length() != c_length){
            std::cout<<"Nem akkora mint kéne";
        }

        setCreator(creator);
        std::cout << Year << " " << Month <<" "<< Day <<" "<<Hour<<":"<<Minute<<endl;
        std::cout << Creator <<std::endl;
    }

    void read_animations(char* chars, size_t length ) {

        for(int i = 0; i < getNumAnim(); i++){
            char duration[8];


        }

    }
    //write data

    //destructor
    ~Caff(){}
};

int main() {

    Caff caff;
    caff.read_from_file("1.caff");

    return 0;
}

// fájl beolvasása, és berakja osztályba CAFF, CIFF; bájtok szerinti sorrendben attribútom feltöltés, CIFF-ből képgenerálás, kell egy szöveges fájl, ami visszaadja a CAff és Ciff tartalmát