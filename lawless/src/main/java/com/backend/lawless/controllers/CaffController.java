package com.backend.lawless.controllers;

import com.backend.lawless.dtos.requests.*;
import com.backend.lawless.dtos.responses.*;
import com.backend.lawless.exceptions.LawlessException;
import com.backend.lawless.services.CaffServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiOperation(value = "Create and process caff ", response = CreateCaffResponse.class, nickname = "create")
    public ResponseEntity<?> create(@AuthenticationPrincipal UserDetails userDetails,
                                    @RequestParam("file") MultipartFile caffFile,
                                    @RequestParam("name") String name,
                                    @RequestParam("description") String description,
                                    @RequestParam("price") double price) {
        try {
            return ResponseEntity.ok(caffService.create(userDetails, new CreateCaffRequest(name, description, price), caffFile));
        } catch (LawlessException | IOException e) {
            return ResponseEntity
                    .badRequest()
                    .body(e);
        }
    }

    @PostMapping(value = "/update")
    @ApiOperation(value = "Update caff ", response = UpdateCaffResponse.class, nickname = "update")
    public ResponseEntity<?> update(@AuthenticationPrincipal UserDetails userDetails,
                                    @RequestBody UpdateCaffRequest request){

        try {
            return ResponseEntity.ok(caffService.update(userDetails, request));
        } catch (LawlessException e) {
            return ResponseEntity
                    .badRequest()
                    .body(e);
        }
    }

    @PostMapping(value = "/delete")
    @ApiOperation(value = "Delete caff ", response = DeleteCaffResponse.class, nickname = "delete")
    public ResponseEntity<?> delete(@AuthenticationPrincipal UserDetails userDetails,
                                    @RequestBody DeleteCaffRequest deleteCaffRequest) {
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
    public ResponseEntity<?> details(@RequestParam Long id) {
        try {
            return ResponseEntity.ok(
                    caffService.details(id));
        } catch (LawlessException e) {
            return ResponseEntity
                    .badRequest()
                    .body(e);
        }
    }

    @GetMapping(value = "/picture")
    @ApiOperation(value = "Get Caff preview picture", response = CaffPictureResponse.class, nickname = "picture")
    public ResponseEntity<?> picture(@RequestParam Long id) {
        try {
            return ResponseEntity.ok(
                    caffService.getPicture(id));
        } catch (LawlessException e) {
            return ResponseEntity
                    .badRequest()
                    .body(e);
        }
    }

    @GetMapping(value = "/detailsAll")
    @ApiOperation(value = "Details all caff ", response = DetailsAllCaffResponse.class, nickname = "detailsAll")
    public ResponseEntity<?> detailsAll() {
        try {
            return ResponseEntity.ok(
                    caffService.detailsAll());
        } catch (LawlessException e) {
            return ResponseEntity
                    .badRequest()
                    .body(e);
        }
    }

    @PostMapping(value = "/commentAdd")
    @ApiOperation(value = "Comment caff ", response = DetailsAllCaffResponse.class, nickname = "comment")
    public ResponseEntity<?> commentAdd(@AuthenticationPrincipal UserDetails userDetails,
                                        @RequestBody CommentAddCaffRequest commentAddCaffRequest) {
        try {
            return ResponseEntity.ok(
                    caffService.commentAdd(userDetails,commentAddCaffRequest));
        } catch (LawlessException e) {
            return ResponseEntity
                    .badRequest()
                    .body(e);
        }
    }
}
