package com.backend.lawless.services;

import com.backend.lawless.daos.CaffRepository;
import com.backend.lawless.daos.UserRepository;
import com.backend.lawless.dtos.requests.CaffDetailsRequest;
import com.backend.lawless.dtos.requests.CreateCaffRequest;
import com.backend.lawless.dtos.requests.DeleteCaffRequest;
import com.backend.lawless.dtos.requests.UpdateCaffRequest;
import com.backend.lawless.dtos.responses.CaffDetailsResponse;
import com.backend.lawless.dtos.responses.CreateCaffResponse;
import com.backend.lawless.dtos.responses.DeleteCaffResponse;
import com.backend.lawless.dtos.responses.UpdateCaffResponse;
import com.backend.lawless.entities.*;
import com.backend.lawless.exceptions.LawlessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

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
        User user = userRepository.findByUsername(userDetails.getUsername());
        Caff caff = new Caff();
        if (caffRepository.findById(request.getId()).isPresent()) {
            caff = caffRepository.findById(request.getId()).get();
        }
        if (user.getRoles().stream().anyMatch(role -> role.getName() == ERole.ROLE_ADMIN)
                || caff.getUserId().equals(user.getId())) {
            // TODO DO update
        }
        return null;
    }

    @Override
    public DeleteCaffResponse delete(UserDetails userDetails, DeleteCaffRequest request) throws LawlessException {
        return null;
    }

    @Override
    public CaffDetailsResponse details(CaffDetailsRequest request) throws LawlessException {
        return null;
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
