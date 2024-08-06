#!/bin/bash

# Function to trim video
trim_video() {
    local base_name=$1
    shift
    local end_times=("$@")
    local input_template="${base_name}_%d.mp4"
    local output_dir="trimmed"

    # Create output directory if it doesn't exist
    if [ ! -d "$output_dir" ]; then
        mkdir -p "$output_dir"
    fi

    for i in "${!end_times[@]}"; do
        local index=$((i + 1))
        local end_time=${end_times[$i]}
        local input_file=$(printf "$input_template" "$index")
        local output_file="${output_dir}/${base_name}_${index}.mp4"

        echo "Trimming ${input_file} to ${end_time} seconds"
        
        ffmpeg -ss 0 -i "$input_file" -t "$end_time" -c:v libx264 -c:a aac -strict -2 -y "$output_file"
    done
}

# Base file name
base_name="TTC_scene-0904"

# List of end times
end_times=(3.2 3.4 3.3)

# Trim the videos
trim_video "$base_name" "${end_times[@]}"