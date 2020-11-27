package com.backend.lawless.controllers;

import com.backend.lawless.dtos.requests.CreateCaffRequest;
import com.backend.lawless.dtos.requests.DeleteCaffRequest;
import com.backend.lawless.dtos.requests.DetailsCaffRequest;
import com.backend.lawless.dtos.responses.CreateCaffResponse;
import com.backend.lawless.dtos.responses.DeleteCaffResponse;
import com.backend.lawless.dtos.responses.DetailsCaffResponse;
import com.backend.lawless.dtos.responses.UpdateCaffResponse;
import com.backend.lawless.exceptions.LawlessException;
import com.backend.lawless.services.CaffServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/caff", name = "Caff")
@Api(tags = "Caff")
public class CaffController {

    @Autowired
    CaffServiceImpl caffService;

    @PostMapping(value = "/create")
    @ApiOperation(value = "Create and process caff ", response = CreateCaffResponse.class, nickname = "create")
    public ResponseEntity<?> create(@AuthenticationPrincipal UserDetails userDetails,
                                    @RequestParam("file") MultipartFile caffFile,
                                    @RequestParam("name") String name,
                                    @RequestParam("description") String description,
                                    @RequestParam("price") double price) {
        try {
            return ResponseEntity.ok(caffService.create(userDetails, new CreateCaffRequest(name, description, price, caffFile.getBytes())));
        } catch (LawlessException | IOException e) {
            return ResponseEntity
                    .badRequest()
                    .body(e);
        }
    }

    @PostMapping(value = "/update")
    @ApiOperation(value = "Update caff ", response = UpdateCaffResponse.class, nickname = "update")
    public ResponseEntity<?> update(@AuthenticationPrincipal UserDetails userDetails,
                                    @RequestParam("file") MultipartFile caffFile,
                                    @RequestParam("name") String name,
                                    @RequestParam("description") String description,
                                    @RequestParam("price") double price) {

        return null;
    }

    @PostMapping(value = "/delete")
    @ApiOperation(value = "Delete caff ", response = DeleteCaffResponse.class, nickname = "delete")
    public ResponseEntity<?> delete(@AuthenticationPrincipal UserDetails userDetails,
                                    @RequestParam DeleteCaffRequest deleteCaffRequest) {
    //localhost:8080/api/caff/delete?deleteCaffRequest=7

        try {
            return ResponseEntity.ok(
                    caffService.delete(userDetails,deleteCaffRequest));
        } catch (LawlessException e) {
            return ResponseEntity
                    .badRequest()
                    .body(e);
        }
    }

    @GetMapping(value = "/details")
    @ApiOperation(value = "Details caff ", response = DetailsCaffResponse.class, nickname = "details")
    public ResponseEntity<?> details(@RequestParam DetailsCaffRequest detailsCaffRequest) {
        try {
            return ResponseEntity.ok(
                    caffService.details(detailsCaffRequest));
        } catch (LawlessException e) {
            return ResponseEntity
                    .badRequest()
                    .body(e);
        }
    }

}
