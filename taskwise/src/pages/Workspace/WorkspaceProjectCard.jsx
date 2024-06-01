import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProjectIconBlack from '../../assets/Projects.png';
import WorkspaceMembers from './WorkspaceMembers'; // Uncomment if needed
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchWorkspaceProjectsAsync } from '../../features/workspace/workspaceSlice';
import ProjectsData from '../../data/projects.json'; // Uncomment if needed

function WorkspaceProjectCard({workspaceId}) {
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    // const projects = useSelector((state) => state.workspace.projects);
    // console.log("WorkspaceProjectCard PROJECTS: ", projects)
    // console.log("WorkspaceProjectCard workspace id: ", workspaceId)
  
    // useEffect(() => {
    //     if (workspaceId) {
    //         dispatch(fetchWorkspaceProjectsAsync(workspaceId));
    //     }
    // }, [dispatch, workspaceId]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={ProjectsData ? 9 : 12}> 
                <Grid container spacing={3}>
                    {ProjectsData && ProjectsData.map((project) => ( 
                        <Grid item key={project.id} xs={12} sm={6} md={4} lg={4} xl={3}>
                            <Card
                                sx={{
                                    width: '100%',
                                    maxWidth: 240,
                                    borderRadius: 2,
                                }}
                                onClick={() => navigate(`/projects/${project.id}`)}
                            >
                                <CardMedia
                                    component="img"
                                    alt="project thumbnail"
                                    height="100"
                                    image={project.img}
                                />
                                <CardContent sx={{ textAlign: "center" }}>
                                    <Grid container alignItems="center" spacing={0.2}>
                                        <Grid item>
                                            <img
                                                src={ProjectIconBlack}
                                                alt="Projects"
                                                style={{ padding: "10px", width: "24px", height: "24px" }}
                                            />
                                        </Grid>
                                        <Grid item sx={{ paddingTop: 2 }}>
                                            <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1rem' }}>
                                                {project.name}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <Grid item xs={12} md={3}>
                <WorkspaceMembers height="365px" width="90%" />
            </Grid>
        </Grid>
    );
}

export default WorkspaceProjectCard;
