import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Flex,
  Button,
  Select,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

// components
import Loading from "../components/loading";
import Confirmation from "../components/confirmation";
import StudentRows, { StudentRowsEdited } from "./sub-components/student-rows";

function ShowTables({ sortBy }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [editConfirm, setEditConfirm] = useState(false);

  const [id, setId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);

  /*Cara menggunakan useRef:
  1) Buat referensi:
      const studentNameRef = useRef("");
  2) Pass ref sebagai props:
      <StudentRowsEdited
        nameRef={studentNameRef}/>
  3) Kasih ref di tempat yang dituju:
      <Input
        ref={nameRef}
      />
  4) Kita bisa ambil value dari element yang di ref:
      const onButtonConfirmEdit = () => {
          name: studentNameRef.current.value,
        };
*/

  const studentNameRef = useRef("");
  const studentEmailRef = useRef("");

  const itemPerPageRef = useRef("");

  //edited state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [program, setProgram] = useState("");
  const [country, setCountry] = useState("");

  // side-effect
  useEffect(() => {
    setLoading(true);

    // fetch data from api/server
    Axios.get("http://localhost:2000/students")
      .then((respond) => {
        setStudents(respond.data);
        setLoading(false);
        setMaxPage(Math.ceil(respond.data.length / itemPerPage));
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  //amount items per page handler
  //bisa juga menggunakan event.target.value
  const itemPerPageHandler = () => {
    setCurrentPage(1);
    setItemPerPage(parseInt(itemPerPageRef.current.value));
    setMaxPage(Math.ceil(students.length / itemPerPageRef.current.value));
  };

  // generate rows
  // sort data
  const beginningIndex = (currentPage - 1) * itemPerPage;
  const generateStudentRows = () => {
    let rawData = [...students];
    const compareProgram = (a, b) => {
      if (a.program < b.program) {
        return -1;
      }
      if (a.program > b.program) {
        return 1;
      }
      return 0;
    };

    const compareCountry = (a, b) => {
      if (a.country < b.country) {
        return -1;
      }
      if (a.country > b.country) {
        return 1;
      }
      return 0;
    };
    switch (sortBy) {
      case "programAZ":
        rawData.sort(compareProgram);
        break;
      case "programZA":
        rawData.sort((a, b) => compareProgram(b, a));
        break;
      case "countryAZ":
        rawData.sort(compareCountry);
        break;
      case "countryZA":
        rawData.sort((a, b) => compareCountry(b, a));
        break;
      default:
        rawData = [...students];
        break;
    }

    const dataPaginated = rawData.slice(
      beginningIndex,
      beginningIndex + itemPerPage
    );

    return dataPaginated.map((student, index) => {
      if (student.id === id) {
        return (
          <StudentRowsEdited
            key={student.id}
            student={student}
            onCancel={onButtonCancelEdit}
            onStudentNameChange={onChangeName}
            onStudentEmailChange={onChangeEmail}
            onSave={onButtonSaveEdit}
            onProgramMenuClick={onProgramMenuClick}
            onCountryMenuClick={onCountryMenuClick}
            programTitle={program}
            countryTitle={country}
            nameRef={studentNameRef}
            emailRef={studentEmailRef}
          />
        );
      } else {
        return (
          <StudentRows
            key={student.id}
            student={student}
            index={(currentPage - 1) * itemPerPage + index}
            onDelete={() => onButtonDelete(student.id)}
            onEdit={() =>
              onButtonEdit(student.id, student.program, student.country)
            }
          />
        );
      }
    });
  };

  //Page move
  const nextPageHandler = () => {
    if (currentPage < maxPage) {
      setCurrentPage((currentPage) => currentPage + 1);
    }
  };

  const prevPageHandler = () => {
    if (currentPage > 1) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  };

  // event
  const onButtonDelete = (id) => {
    setConfirm(true);
    setId(id);
  };

  const onButtonCancelDelete = () => {
    setConfirm(false);
    setId(null);
  };

  const onButtonConfirmDelete = () => {
    setConfirm(false);
    setLoading(true);

    Axios.delete(`http://localhost:2000/students/${id}`)
      .then((respond) => {
        console.log(respond.data);

        Axios.get("http://localhost:2000/students").then((respond2) => {
          setStudents(respond2.data);
          setLoading(false);
          setId(null);
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setId(null);
      });
  };

  const onButtonEdit = (id, program, country) => {
    setId(id);
    setProgram(program);
    setCountry(country);
  };

  const onButtonCancelEdit = () => {
    setId(null);
  };

  const onButtonCancelConfirmEdit = () => {
    setId(null);
    setEditConfirm(false);
  };

  // ///////////////////////////////
  const onChangeName = (event) => {
    console.log(event.target.value);
    setName(() => event.target.value);
  };

  const onChangeEmail = (event) => {
    console.log(event.target.value);
    setEmail(() => event.target.value);
  };
  // ///////////////////////////////

  const onProgramMenuClick = (event) => {
    console.log(event.target.value);
    setProgram(event.target.value);
  };

  const onCountryMenuClick = (event) => {
    console.log(event.target.value);
    setCountry(event.target.value);
  };

  const onButtonSaveEdit = () => {
    setEditConfirm(true);
  };

  const onButtonConfirmEdit = () => {
    console.log(id);
    const newEditedData = {
      id: id,
      name: studentNameRef.current.value,
      email: studentEmailRef.current.value,
      program: program,
      country: country,
    };
    console.log(newEditedData);
    Axios.put(`http://localhost:2000/students/${id}`, newEditedData)
      .then((respond) => {
        console.log(respond.data);

        setEditConfirm(false);
        Axios.get(`http://localhost:2000/students`)
          .then((respond2) => {
            setStudents(respond2.data);
            setId(null);
            setProgram("");
            setCountry("");
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box w="100%" px="161px">
      <Loading onLoading={loading} />
      <Confirmation
        isOpen={confirm}
        title="Delete Confirmation"
        onButtonCancel={onButtonCancelDelete}
        onButtonConfirm={onButtonConfirmDelete}
        nameRef={studentNameRef}
      />
      <Confirmation
        isOpen={editConfirm}
        title="Edit Confirmation"
        onButtonCancel={onButtonCancelConfirmEdit}
        onButtonConfirm={onButtonConfirmEdit}
        nameRef={studentNameRef}
      />
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Program</Th>
            <Th>Country</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>{generateStudentRows()}</Tbody>
      </Table>
      <Box w="100%" p={5}>
        <Flex justify={"space-between"} align={"center"}>
          <Box>
            {beginningIndex + 1}-
            {currentPage != maxPage
              ? beginningIndex + itemPerPage
              : students.length}{" "}
            of {students.length}
          </Box>
          <Flex align={"center"} justify="center">
            <Flex direction={"row"} px={5} align="center">
              <Box px={3}>Rows per page:</Box>

              <Select
                size="sm"
                w={"15"}
                id={"selectItemPerPage"}
                ref={itemPerPageRef}
                onChange={itemPerPageHandler}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={students.length}>All</option>
              </Select>
            </Flex>
            <Flex align={"center"} justify="center">
              <Button onClick={prevPageHandler} disabled={currentPage === 1}>
                <ChevronLeftIcon w={4} h={4} color="gray.400" />
              </Button>
              <Box px={2}>
                {currentPage}/{maxPage}
              </Box>
              <Button
                onClick={nextPageHandler}
                disabled={currentPage === maxPage}
              >
                <ChevronRightIcon w={4} h={4} color="gray.400" />
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}

export default ShowTables;
