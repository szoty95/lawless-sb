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
import com.backend.lawless.entities.Caff;
import com.backend.lawless.entities.User;
import com.backend.lawless.exceptions.LawlessException;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Date;

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
        caff.setCaffFile(readBytesOfFile(request.getCaffFile()));
        } catch (Exception e) {
            throw new LawlessException(e.getMessage());
        }
        caffRepository.save(caff);
        return new CreateCaffResponse(caff.getId());
    }

    @Override
    public UpdateCaffResponse update(UserDetails userDetails, UpdateCaffRequest request) throws LawlessException {
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
}
