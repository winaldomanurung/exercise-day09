import {
  Box,
  Select,
  Input,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";

const ShowForm = () => {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputProgram, setInputProgram] = useState("");
  const [inputCountry, setInputCountry] = useState("");
  const onNameInputHandler = (event) => {
    console.log(event.target.value);
    setInputName(() => event.target.value);
  };
  const onEmailInputHandler = (event) => {
    console.log(event.target.value);
    setInputEmail(() => event.target.value);
  };
  const onProgramInputHandler = (event) => {
    console.log(event.target.value);
    setInputProgram(() => event.target.value);
  };
  const onCountryInputHandler = (event) => {
    console.log(event.target.value);
    setInputCountry(() => event.target.value);
  };

  const formSubmitHandler = () => {
    const newStudentData = {
      name: inputName,
      email: inputEmail,
      program: inputProgram,
      country: inputCountry,
    };
    console.log(newStudentData);
    Axios.post(`http://localhost:2000/students`, newStudentData)
      .then((respond) => {
        console.log(respond.data);

        Axios.get(`http://localhost:2000/students`)
          .then((respond2) => {
            setInputName(() => "");
            setInputEmail(() => "");
            setInputProgram(() => "");
            setInputCountry(() => "");
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box w="100%" px="161px">
      <FormControl>
        <FormLabel mb="8px" fontSize="md" htmlFor="name">
          Name
        </FormLabel>
        <Input
          value={inputName}
          onChange={onNameInputHandler}
          variant="outline"
          placeholder="e.x Joko Susilo"
          size="md"
          id="name"
          w="40%"
          minW="400px"
        />
        <FormLabel mb="8px" mt="20px" fontSize="md" htmlFor="email">
          Email
        </FormLabel>
        <Input
          value={inputEmail}
          onChange={onEmailInputHandler}
          variant="outline"
          placeholder="e.x joko.susilo@gmail.com"
          size="md"
          id="email"
          w="40%"
          type="email"
          minW="400px"
        />
        <FormLabel mb="8px" mt="20px" fontSize="md" htmlFor="program">
          Program
        </FormLabel>
        <Select
          id="program"
          placeholder="Select program"
          w="40%"
          value={inputProgram}
          onChange={onProgramInputHandler}
          minW="400px"
        >
          <option value={"Fullstack Web Development"}>
            Fullstack Web Development
          </option>
          <option value={"UIUX Designer"}>UIUX Designer</option>
          <option value={"Digital Marketing"}>Digital Marketing</option>
          <option value={"Data Science"}>Data Science</option>
        </Select>
        <FormLabel mb="8px" mt="20px" fontSize="md" htmlFor="country">
          Country
        </FormLabel>
        <Select
          id="country"
          placeholder="Select country"
          w="40%"
          value={inputCountry}
          onChange={onCountryInputHandler}
          minW="400px"
        >
          <option value={"Japan"}>Japan</option>
          <option value={"Korea"}>Korea</option>
          <option value={"USA"}>USA</option>
          <option value={"Russia"}>Russia</option>
        </Select>
        <Button
          mt="20px"
          colorScheme="teal"
          type="submit"
          onClick={formSubmitHandler}
        >
          <Link to="/table">
            <AddIcon mr={"10px"} />
            Submit
          </Link>
        </Button>
      </FormControl>
    </Box>
  );
};

export default ShowForm;
