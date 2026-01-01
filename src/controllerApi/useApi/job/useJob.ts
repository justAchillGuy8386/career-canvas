"use client";

import useSWR, { useSWRConfig } from "swr";
import { getJobs, createJob } from "@/application/api/job";
import { Job } from "@/types/job";
import { useState } from "react";