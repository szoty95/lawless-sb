package com.backend.lawless.services;

import com.backend.lawless.daos.CaffRepository;
import com.backend.lawless.daos.UserRepository;
import com.backend.lawless.dtos.requests.DetailsCaffRequest;
import com.backend.lawless.dtos.requests.CreateCaffRequest;
import com.backend.lawless.dtos.requests.DeleteCaffRequest;
import com.backend.lawless.dtos.requests.UpdateCaffRequest;
import com.backend.lawless.dtos.responses.*;
import com.backend.lawless.entities.*;
import com.backend.lawless.exceptions.LawlessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Scanner;

@Service
public class CaffServiceImpl implements CaffService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    CaffRepository caffRepository;

    private User getUserSafely(UserDetails userDetails) {
        if (userRepository.existsByUsername(userDetails.getUsername())) {
            return userRepository.findByUsername(userDetails.getUsername());
        }
        return null;
    }
    private Caff getCaffSafely(Long caffId) {
        if (caffRepository.findById(caffId).isPresent()) {
            return caffRepository.findById(caffId).get();
        }
        return null;
    }

    @Override
    public CreateCaffResponse create(UserDetails userDetails, CreateCaffRequest request) throws LawlessException {
        User user = userRepository.findByUsername(userDetails.getUsername());
        if (user == null) {
            throw new LawlessException("Cannot find user!");
        }
        Caff caff = new Caff();
        caff.setUserId(user.getId());
        caff.setName(request.getName());
        caff.setDescription(request.getDescription());
        caff.setUploaded(new Date());
        caff.setPrice(request.getPrice());
        try {
        caff.setCaffFile(request.getCaffFile());
        } catch (Exception e) {
            throw new LawlessException(e.getMessage());
        }
        // TODO delete when parser is called finally
        readParsedFiles(caff);
        caffRepository.save(caff);
        // TODO call parser with caff id
        return new CreateCaffResponse(caff.getId());
    }

    @Override
    public UpdateCaffResponse update(UserDetails userDetails, UpdateCaffRequest request) throws LawlessException {
        User user = getUserSafely(userDetails);

        Caff caff = getCaffSafely(request.getCaffId());

        if (user.getRoles().stream().anyMatch(role -> role.getName() == ERole.ROLE_ADMIN)
                || caff.getUserId().equals(user.getId())) {
            // TODO DO update
        }
        return null;
    }

    @Override
    public DeleteCaffResponse delete(UserDetails userDetails, DeleteCaffRequest request) throws LawlessException {
        User user = getUserSafely(userDetails);
        Caff caff = getCaffSafely(Long.valueOf(request.getCaffId()));

            // Delete if admin, or current user uploaded caff
        try {
            if (user.getRoles().stream().anyMatch(role -> role.getName() == ERole.ROLE_ADMIN)
                    || user.getId().equals(caff.getUserId())) {
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

       try{
            Caff caff = getCaffSafely(Long.valueOf(request.getCaffId()));

            return new DetailsCaffResponse(caff.getId(),caff.getUserId(),caff.getName(),
                    caff.getDescription(),caff.getUploaded(),caff.getPrice(),caff.getComments());

        }catch (Exception e){
           throw new LawlessException("Not Found!");
       }

    }

    private byte[] readBytesOfFile(File file) throws IOException {
        byte[] bytes = new byte[(int) file.length()];

        try (FileInputStream fis = new FileInputStream(file)) {

            //read file into bytes[]
            fis.read(bytes);

        } catch (IOException e) {
            e.printStackTrace();
        }

        return bytes;
    }

    private void readParsedFiles(Caff caff) throws LawlessException {
        Ciff ciff1 = new Ciff();
        Ciff ciff2 = new Ciff();
        File ciffPrew1 = new File("src/main/resources/caff-test/pista.ppm");
        File ciffPrew2 = new File("src/main/resources/caff-test/pista2.ppm");
        // TODO delete when file upload is completed;
        File caffFile = new File("src/main/resources/caff-test/2.caff");
        // TODO END
        try {
            // TODO delete when file upload is completed;
//            caff.setCaffFile(readBytesOfFile(caffFile));
            // TODO END
            File myObj = new File("src/main/resources/caff-test/logdata.txt");
            Scanner myReader = new Scanner(myObj);
            List<String> logData = new ArrayList<String>();
            while (myReader.hasNextLine()) {
                logData.add(myReader.nextLine());
            }
            myReader.close();
            // TODO This is baaaad and only for testing purposes
            ciff1.setCiffFilePreview(readBytesOfFile(ciffPrew1));
            ciff1.setCaption(logData.get(0));
            ciff1.setWidth(Integer.parseInt(logData.get(1)));
            ciff1.setHeight(Integer.parseInt(logData.get(2)));
            ciff1.setTags(new ArrayList<>());
            ciff1.getTags().add(new Tag(logData.get(3)));
            ciff1.getTags().add(new Tag(logData.get(4)));
            ciff1.getTags().add(new Tag(logData.get(5)));
            // Ciff2
            ciff2.setCiffFilePreview(readBytesOfFile(ciffPrew2));
            ciff2.setCaption(logData.get(0));
            ciff2.setWidth(Integer.parseInt(logData.get(1)));
            ciff2.setHeight(Integer.parseInt(logData.get(2)));
            ciff2.setTags(new ArrayList<>());
            ciff2.getTags().add(new Tag(logData.get(3)));
            ciff2.getTags().add(new Tag(logData.get(4)));
            ciff2.getTags().add(new Tag(logData.get(5)));
            caff.setCiffs(new ArrayList<>());
            caff.getCiffs().add(ciff1);
            caff.getCiffs().add(ciff2);
        } catch (IOException e) {
            throw new LawlessException(e.getMessage());
        }
    }
}
