import React from 'react'
import ExploreIcon from '@material-ui/icons/Explore';
import StorageIcon from '@material-ui/icons/Storage';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        padding: 5,
        marginRight: 10
    }
})
function SidebarIcons(props) {
    const classes = useStyles();

    switch (props.icon){
        case "Explore":
            return <ExploreIcon className={classes.root}/>
        case "Storage": 
            return <StorageIcon className={classes.root}/>
        case "Rules":
            return <CloudUploadIcon className={classes.root}/>
        case "Monitoring":
            return <AssessmentIcon className={classes.root}/>
        default:
            return
    }
}

export default SidebarIcons
