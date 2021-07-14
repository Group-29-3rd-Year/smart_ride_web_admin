import React from 'react';
import { Fragment } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';


const UpdateSingleBus = () => {

    return(
        <Fragment>
            <EditIcon />
            <Dialog>
                <DialogTitle>
                    Edit Bus Details
                </DialogTitle>
                <DialogContent>
                    Content
                </DialogContent>
            </Dialog>
        </Fragment>
    )
};  

export default UpdateSingleBus;