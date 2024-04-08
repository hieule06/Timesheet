import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  AppBar,
  Box,
  IconButton,
  Tab,
  Tabs,
  Typography,
  DialogActions
} from "@mui/material";
import "./ModalProject.scss";
import CloseIcon from "@mui/icons-material/Close";
import { ModalGeneral } from "./ModalGeneral/ModalGeneral";
import { ModalTeam } from "./ModalTeam/ModalTeam";
import { ModalTaskPrj } from "./ModalTaskPrj/ModalTaskPrj";
import { ButtonControl } from "../Button/Button";
import { TITLE_BUTTON } from "../../constants/button/ButtonConstants";
import { TypeDataModalProject } from "../../type/TypeDataModalProject";
import { TypeListCustomer } from "../../type/TypeListCustomer";

interface ModalProjectProps {
  handleIsOpenModal: () => void;
  handleIsCloseModal: () => void;
  isOpenModal: boolean;
  dataItemProjectProp: Partial<TypeDataModalProject> | undefined;
  dataListCustomer: TypeListCustomer[] | undefined;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
    >
      {children}
    </Typography>
  );
}

export const ModalProject: React.FC<ModalProjectProps> = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Dialog
        open={props.isOpenModal}
        onClose={props.handleIsCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="wrapper-dialog-project"
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
          className="!text-3xl text-[#000000DE] font-extrabold border-b border-gray-300 !mt-5 !mb-[10px]"
        >
          Edit Project : {props.dataItemProjectProp?.name}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={props.handleIsCloseModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          sx={{
            bgcolor: "background.paper",
            width: 500,
            position: "relative",
            minHeight: 200
          }}
        >
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="action tabs example"
              className="pt-5 bg-white"
            >
              <Tab
                label={<span className="normal-case font-medium">General</span>}
              />
              <Tab
                label={<span className="normal-case font-medium">Team</span>}
              />
              <Tab
                label={<span className="normal-case font-medium">Tasks</span>}
              />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <ModalGeneral
              dataItemProjectProp={props.dataItemProjectProp}
              dataListCustomer={props.dataListCustomer}
            />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <ModalTeam />
          </TabPanel>

          <TabPanel value={value} index={2}>
            <ModalTaskPrj />
          </TabPanel>
        </Box>
        <DialogActions className="left-0 bg-white">
          <ButtonControl
            title={TITLE_BUTTON.CANCEL}
            handleClick={() => {}}
            dataItem={undefined}
          />
          <ButtonControl
            title={TITLE_BUTTON.SAVE}
            dataItem={undefined}
            handleClick={() => {}}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalProject;
