package com.backend.lawless;

import com.backend.lawless.dtos.requests.CommentAddCaffRequest;
import com.backend.lawless.dtos.requests.CreateCaffRequest;
import com.backend.lawless.dtos.requests.UpdateCaffRequest;
import com.backend.lawless.dtos.responses.UpdateCaffResponse;
import com.backend.lawless.exceptions.LawlessException;
import com.backend.lawless.services.CaffServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;

@SpringBootTest
class LawlessApplicationTests {

	Long mockId;
	String mockTime;
	CaffServiceImpl csi = Mockito.mock(CaffServiceImpl.class);
	UserDetails userDetails = Mockito.mock(UserDetails.class);
	CreateCaffRequest request = Mockito.mock(CreateCaffRequest.class);
	UpdateCaffRequest mockUpdateRequest = Mockito.mock(UpdateCaffRequest.class);
	MultipartFile caffFile = Mockito.mock(MultipartFile.class);
	UpdateCaffResponse mockUpdate = Mockito.mock(UpdateCaffResponse.class);
	CommentAddCaffRequest mockComment = Mockito.mock(CommentAddCaffRequest.class);

	//Get OsName on Windows
	@Test
	void getWindowsOs(){
		assertTrue(CaffServiceImpl.isWindows());
	}

	//Get OsName on Linux
	@Test
	void getLinuxOs(){
		assertFalse(CaffServiceImpl.isWindows());
	}

	//Create a CreateCaffResponse
	@Test
	void caffResponseCreation() throws LawlessException, IOException {
			csi.create(userDetails, request, caffFile);
			verify(csi).create(userDetails, request, caffFile);
	}

	//Update Caff Response
	@Test
	void updateCaffResponse() throws LawlessException {
		csi.update(userDetails, mockUpdateRequest);
		verify(csi).update(userDetails, mockUpdateRequest);
	}

	//Delete Caff Response
	@Test
	void deleteCaffResponse() throws LawlessException {
		csi.delete(userDetails, mockId);
		verify(csi).delete(userDetails, mockId);
	}

	//Get detail of Caff Response
	@Test
	void detailsOfCaffResp() throws LawlessException {
		csi.details(mockId);
		verify(csi).details(mockId);

	}

	//Get a preview picture
	@Test
	void getPreviewPicture() throws LawlessException {
		csi.getPicture(mockId);
		verify(csi).getPicture(mockId);
	}

	//Get the List of Caffs
	@Test
	void listOfCaffs() throws LawlessException {
		csi.detailsAll();
		verify(csi).detailsAll();
	}

	//Add comment
	@Test
	void addingComment() throws LawlessException {
		csi.commentAdd(userDetails,mockComment);
		verify(csi).commentAdd(userDetails,mockComment);
	}
}
