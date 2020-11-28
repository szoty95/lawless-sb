package com.backend.lawless.services;

import com.backend.lawless.daos.CaffRepository;
import com.backend.lawless.daos.UserRepository;
import com.backend.lawless.dtos.parts.UserPersonalData;
import com.backend.lawless.dtos.requests.*;
import com.backend.lawless.dtos.responses.*;
import com.backend.lawless.entities.*;
import com.backend.lawless.exceptions.LawlessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.List;

@Service
public class CaffServiceImpl implements CaffService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    CaffRepository caffRepository;

    private User getUserSafely(UserDetails userDetails) throws LawlessException {
        if (userRepository.existsByUsername(userDetails.getUsername())) {
            return userRepository.findByUsername(userDetails.getUsername());
        }
        throw new LawlessException("Cant find user");
    }
    private Caff getCaffSafely(Long caffId) throws LawlessException {
        if (caffRepository.findById(caffId).isPresent()) {
            return caffRepository.findById(caffId).get();
        }
        throw new LawlessException("Cant find caff");
    }

    @Override
    public CreateCaffResponse create(UserDetails userDetails, CreateCaffRequest request, MultipartFile caffFile) throws LawlessException, IOException {
        User user = getUserSafely(userDetails);

        Caff caff = new Caff();
        caff.setUserId(user.getId());
        caff.setName(request.getName());
        caff.setDescription(request.getDescription());
        caff.setUploaded(new Date());
        caff.setPrice(request.getPrice());
        try {
        caff.setCaffFile(caffFile.getBytes());
        } catch (Exception e) {
            throw new LawlessException(e.getMessage());
        }


        saveCafftoLocal(caffFile);
        parseCaff(caff, caffFile);
//        readParsedFiles(caff); //todo comment out after parseCaff works
        caffRepository.save(caff);
        deleteParsedFiles();

        return new CreateCaffResponse(caff.getId());
    }

    private void deleteParsedFiles() {

        String rootDirectory=System.getProperty("user.dir");
        String caffParserDirectory=rootDirectory+"\\src\\main\\resources\\caffParser";
        String caffParserRelativeRoute = caffParserDirectory+"\\caffparser.exe";


        String command = "cmd /c \" cd " + caffParserDirectory + " && for /f %F in ('dir /b /a-d ^| findstr /vile \".exe\"') do del \"%F\""  +"\" ";

        System.out.println(command);
        try {
            Process process = Runtime.getRuntime().exec(command);

            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            process.waitFor();

            reader.close();

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }

    }

    @Override
    public UpdateCaffResponse update(UserDetails userDetails, UpdateCaffRequest request)
            throws LawlessException {
        User user = getUserSafely(userDetails);
        Caff caff = getCaffSafely(Long.valueOf(request.getCaffId()));

        // update if admin, or current user requested caff update
        try {
            if (user.getRoles().stream().anyMatch(role -> role.getName() == ERole.ROLE_ADMIN)
                    || user.getId().equals(caff.getUserId())) {

             //   if (request.getCaffFile() != null) {
             //       caff.setCaffFile(request.getCaffFile());
             //   }
                if (request.getName() != null) {
                    caff.setName(request.getName());
                }
                if (request.getDescription() != null) {
                    caff.setDescription(request.getDescription());
                }
                if (request.getPrice() != null) {
                    caff.setPrice(request.getPrice());
                }

                caffRepository.save(caff);

                return new UpdateCaffResponse("Update successful!");
            }
        } catch (Exception e) {
            throw new LawlessException("Update failed!");
        }

        throw new LawlessException("Update failed!");
    }

    @Override
    public DeleteCaffResponse delete(UserDetails userDetails, DeleteCaffRequest request) throws LawlessException {
        User user = getUserSafely(userDetails);
        Caff caff = getCaffSafely(Long.valueOf(request.getCaffId()));

            // Delete if admin, or current user uploaded caff
        try {
            if (user.getRoles().stream().anyMatch(role -> role.getName() == ERole.ROLE_ADMIN)
                    || user.getId().equals(caff.getUserId())) {
                caff.setCiffs(null);

                caffRepository.deleteById(Long.valueOf(request.getCaffId()));
                return new DeleteCaffResponse("Delete successful!");
            }
        }catch (Exception e){
            throw new LawlessException("Delete failed!");
        }

        throw new LawlessException("Delete failed!");
    }

    @Override
    public DetailsCaffResponse details(DetailsCaffRequest request) throws LawlessException {
        try {
            Caff caff = getCaffSafely(Long.valueOf(request.getCaffId()));
            DetailsCaffResponse response =new DetailsCaffResponse(caff);

            if(userRepository.existsById(response.getUserId())) {
               User user = userRepository.findById(response.getUserId()).get();



            response.setUserPersonalData(new UserPersonalData(
                            user.getUsername(),
                            user.getEmail(),
                            user.getFirstName(),
                            user.getLastName(),
                            user.getId().toString()));

            return response;
            } throw new LawlessException("Not Found!");

        } catch (Exception e) {
            throw new LawlessException("Not Found!");
        }
    }

    @Override
    public DetailsAllCaffResponse detailsAll() throws LawlessException {
        try {
            List<Caff> caffs = caffRepository.findAll();
            List<DetailsCaffResponse> caffResponses = new ArrayList<DetailsCaffResponse>();

            for (Caff caffItem:caffs) {


                DetailsCaffResponse response =new DetailsCaffResponse(caffItem);


                if(userRepository.existsById(caffItem.getUserId())) {
                    User user = userRepository.findById(caffItem.getUserId()).get();

                    response.setUserPersonalData(new UserPersonalData(
                            user.getUsername(),
                            user.getEmail(),
                            user.getFirstName(),
                            user.getLastName(),
                            user.getId().toString()));
                }
                caffResponses.add(response);

            }

          return new DetailsAllCaffResponse(caffResponses);
        } catch (Exception e) {
            throw new LawlessException("Not Found!");
        }
    }

    private byte[] readBytesOfFile(File file) throws IOException {
        byte[] imageInByte = null;
        try {
            BufferedImage placeholder = ImageIO.read(file);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(placeholder, "png", baos);
            baos.flush();
            imageInByte = baos.toByteArray();
            baos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return imageInByte;
//        byte[] bytes = new byte[(int) file.length()];
//
//        try (FileInputStream fis = new FileInputStream(file)) {
//
//            //read file into bytes[]
//            fis.read(bytes);
//
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//
//        return bytes;
    }

    private void saveCafftoLocal(MultipartFile multipartFileCaff) throws LawlessException{
        String rootDirectory=System.getProperty("user.dir");
        String caffParserDirectory=rootDirectory+"\\src\\main\\resources\\caffParser";

        Path filepath = Paths.get(caffParserDirectory, multipartFileCaff.getOriginalFilename());

        try {
            multipartFileCaff.transferTo(filepath);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
    //WINDOWS dependency
    private void parseCaff(Caff caff, MultipartFile multipartFileCaff) throws LawlessException, IOException {

        String rootDirectory=System.getProperty("user.dir");
        String caffParserDirectory=rootDirectory+"\\src\\main\\resources\\caffParser";
        String caffParserRelativeRoute = caffParserDirectory+"\\caffparser.exe";
        String caffParserArgs = multipartFileCaff.getOriginalFilename() + " " +
                multipartFileCaff.getOriginalFilename() +"_prev " +
                multipartFileCaff.getOriginalFilename() + "_ciff";

        String command = "cmd /c \" cd " + caffParserDirectory + " && caffparser.exe " + caffParserArgs +"\" ";

        System.out.println(command);
        try {
            Process process = Runtime.getRuntime().exec(command);

            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            process.waitFor();

            reader.close();

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }

        //TODO Parse output files.....
        Path ciffFilePath = Paths.get(caffParserDirectory, multipartFileCaff.getOriginalFilename()+"_ciff.txt");

        Scanner myReader = new Scanner(ciffFilePath);
        List<String> logData = new ArrayList<String>();
        while (myReader.hasNextLine()) {
            logData.add(myReader.nextLine());
        }
        myReader.close();
        // TODO This is baaaad and only for testing purposes
        Ciff ciff1 = new Ciff();
        File ciffPrew1 = new File(caffParserDirectory+"\\"+multipartFileCaff.getOriginalFilename() +"_prev.ppm.ppm");

        ciff1.setCiffFilePreview(readBytesOfFile(ciffPrew1));
        ciff1.setCaption(logData.get(0));
        ciff1.setWidth(Integer.parseInt(logData.get(1)));
        ciff1.setHeight(Integer.parseInt(logData.get(2)));
        ciff1.setTags(new ArrayList<>());
        ciff1.getTags().add(new Tag(logData.get(3)));
        ciff1.getTags().add(new Tag(logData.get(4)));
        ciff1.getTags().add(new Tag(logData.get(5)));

        caff.setCiffs(new ArrayList<>());
        caff.getCiffs().add(ciff1);

    }

    private void readParsedFiles(Caff caff) throws LawlessException {
//        Ciff ciff1 = new Ciff();
//        Ciff ciff2 = new Ciff();
//        File ciffPrew1 = new File("src/main/resources/caff-test/pista.ppm");
//        File ciffPrew2 = new File("src/main/resources/caff-test/pista2.ppm");
//        // TODO delete when file upload is completed;
//        File caffFile = new File("src/main/resources/caff-test/2.caff");
//        // TODO END
//        try {
//            // TODO delete when file upload is completed;
////            caff.setCaffFile(readBytesOfFile(caffFile));
//            // TODO END
//            File myObj = new File("src/main/resources/caff-test/logdata.txt");
//            Scanner myReader = new Scanner(myObj);
//            List<String> logData = new ArrayList<String>();
//            while (myReader.hasNextLine()) {
//                logData.add(myReader.nextLine());
//            }
//            myReader.close();
//            // TODO This is baaaad and only for testing purposes
//            ciff1.setCiffFilePreview(readBytesOfFile(ciffPrew1.toPath()));
//            ciff1.setCaption(logData.get(0));
//            ciff1.setWidth(Integer.parseInt(logData.get(1)));
//            ciff1.setHeight(Integer.parseInt(logData.get(2)));
//            ciff1.setTags(new ArrayList<>());
//            ciff1.getTags().add(new Tag(logData.get(3)));
//            ciff1.getTags().add(new Tag(logData.get(4)));
//            ciff1.getTags().add(new Tag(logData.get(5)));
//            // Ciff2
//            ciff2.setCiffFilePreview(readBytesOfFile(ciffPrew2));
//            ciff2.setCaption(logData.get(0));
//            ciff2.setWidth(Integer.parseInt(logData.get(1)));
//            ciff2.setHeight(Integer.parseInt(logData.get(2)));
//            ciff2.setTags(new ArrayList<>());
//            ciff2.getTags().add(new Tag(logData.get(3)));
//            ciff2.getTags().add(new Tag(logData.get(4)));
//            ciff2.getTags().add(new Tag(logData.get(5)));
//            caff.setCiffs(new ArrayList<>());
//            caff.getCiffs().add(ciff1);
//            caff.getCiffs().add(ciff2);
//        } catch (IOException e) {
//            throw new LawlessException(e.getMessage());
//        }
    }


}
