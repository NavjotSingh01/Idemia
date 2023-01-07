import React, { useState, useEffect } from 'react';
import axios from "axios";

export const saveJson = (posts: any) => {
    // api URL // end point from node server / express server
    const url = 'http://localhost:8000/write'
    axios.post(url, posts)
        .then(response => {
            // console.log(response);
        });
}
