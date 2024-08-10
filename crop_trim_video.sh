#!/bin/bash
start_time=0  # Start at 12.5 seconds
end_time=11.5  # End at 28 seconds
input_file="static/videos/source/website_source.mp4"
output_file="TTC_0.mp4"

# Calculate the duration using bc for floating-point arithmetic
duration=$(echo "$end_time - $start_time" | bc)

echo "Duration: $duration seconds"

# Run ffmpeg with the calculated duration and start time
ffmpeg -ss "$start_time" -i "$input_file" -t "$duration" -filter:v "crop=1280:620:0:200" -c:v libx264 -c:a aac -strict -2 -y "$output_file"