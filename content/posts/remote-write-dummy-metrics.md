---
title: "Remote Write Dummy Metrics"
date: 2022-08-31T20:49:58+05:30
draft: true
---

While working on any system built on top of prometheus based storage, you might want to use dummy data for testing. But prometheus based storages (prometheus, victoriaMetrics, m3db etc) don’t support “insert” queries like SQL. So, this doc will walk you through how to remote_write data into promehteus whithout having to write any code

## Setup

1. Make sure you have a tool that can spin up a simple HTTP server that can serve static files. `python` also will do
2. Install any prometheus based remote write agent 
    
    `vmagent` — download the latest version of `vimutils` from this [github release page](https://github.com/VictoriaMetrics/VictoriaMetrics/releases), unarchive it and place the `vmagent` binary in your system PATH
    

### Steps

1. Create a file called `metrics` with the below contents. This is the dummy data we will be inserting into the storage. This is in the **Open metrics format** everyone is talking about
    
    ```
    request_count{tag_namespace="alpha", region="ap-south-1"} 30
    request_count{tag_namespace="beta", region="ap-south-1"} 20
    request_count{tag_namespace="gamma", region="ap-south-1"} 10
    request_count{tag_namespace="gamma", region="us-east-1"} 10
    error{tag_namespace="alpha", region="ap-south-1"} 1
    error{tag_namespace="beta", region="ap-south-1"} 0
    error{tag_namespace="gamma", region="us-east-1"} 4
    ```
    
2. Run an HTTP server that can server this file on `/metrics`
    
    ```bash
    $ cd to/dir/containing/above/file
    $ python -m http.server 9000
    Serving HTTP on 0.0.0.0 port 9000 (http://0.0.0.0:9000/) ...
    ```
    
3. Create a simple prometheus scrape config in a file called `scrape.yml`
    
    ```bash
    global:
      scrape_interval: 5s
      evaluation_interval: 5s
    
    scrape_configs:
      - job_name: "prometheus"
        static_configs:
          - targets: ["localhost:9000"]
    ```
    
4. Get the remote write URL for the prometheus storage
5. Run `vmagent` with the below command. This should start inserting the above data into the storage every 5 seconds. The timestamp used will be the time at which the scrape happens (time observed)
    
    ```bash
    $ vmagent --promscrape.config=scrape.yml \
    	--promscrape.config.strictParse false \
    	--remoteWrite.url <remote_write_url>
    ```
