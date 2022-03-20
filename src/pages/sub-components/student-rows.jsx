import React from "react";
import {
  Tr,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Input,
  Button,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  EditIcon,
  DeleteIcon,
  CheckIcon,
  CloseIcon,
} from "@chakra-ui/icons";

export default function StudentRows({ student, index, onDelete, onEdit }) {
  return (
    <Tr>
      <Td>{index + 1}</Td>
      <Td>{student.name}</Td>
      <Td>{student.email}</Td>
      <Td>{student.program}</Td>
      <Td>{student.country}</Td>
      <Td>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<ChevronDownIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem icon={<EditIcon />} onClick={onEdit}>
              Edit
            </MenuItem>
            <MenuItem onClick={onDelete} icon={<DeleteIcon />}>
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
}

export function StudentRowsEdited({
  student,
  onCancel,
  onSave,
  onStudentNameChange,
  onStudentEmailChange,
  nameRef,
  emailRef,
  onProgramMenuClick,
  onCountryMenuClick,
  programTitle,
  countryTitle,
}) {
  return (
    <Tr>
      <Td>#</Td>
      <Td>
        <Input
          type="text"
          defaultValue={student.name}
          onChange={onStudentNameChange}
          ref={nameRef}
        />
      </Td>
      <Td>
        <Input
          type="email"
          defaultValue={student.email}
          onChange={onStudentEmailChange}
          ref={emailRef}
        />
      </Td>
      <Td>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {programTitle ? programTitle : "Program"}
          </MenuButton>
          <MenuList>
            <MenuItem
              value={"Fullstack Web Development"}
              onClick={onProgramMenuClick}
            >
              Fullstack Web Development
            </MenuItem>
            <MenuItem onClick={onProgramMenuClick} value={"UIUX Designer"}>
              UIUX Designer
            </MenuItem>
            <MenuItem onClick={onProgramMenuClick} value={"Digital Marketing"}>
              Digital Marketing
            </MenuItem>
            <MenuItem onClick={onProgramMenuClick} value={"Data Science"}>
              Data Science
            </MenuItem>
          </MenuList>
        </Menu>
      </Td>
      <Td>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {countryTitle ? countryTitle : "Country"}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onCountryMenuClick} value={"Japan"}>
              Japan
            </MenuItem>
            <MenuItem onClick={onCountryMenuClick} value={"Korea"}>
              Korea
            </MenuItem>
            <MenuItem onClick={onCountryMenuClick} value={"USA"}>
              USA
            </MenuItem>
            <MenuItem onClick={onCountryMenuClick} value={"Russia"}>
              Russia
            </MenuItem>
          </MenuList>
        </Menu>
      </Td>
      <Td>
        <IconButton colorScheme="green" icon={<CheckIcon />} onClick={onSave} />
        <IconButton
          ml="5px"
          colorScheme="red"
          icon={<CloseIcon />}
          onClick={onCancel}
        />
      </Td>
    </Tr>
  );
}
