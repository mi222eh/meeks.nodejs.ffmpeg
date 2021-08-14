export interface MediaFile {
    streams: Stream[];
    format: Format;
}

export interface Format {
    filename: string;
    nb_streams: number;
    nb_programs?: number;
    format_name: string;
    format_long_name: string;
    start_time: string;
    duration: string;
    size: string;
    bit_rate: string;
    probe_score?: number;
    tags: FormatTags;
}

export interface FormatTags {
    major_brand: string;
    minor_version: string;
    compatible_brands: string;
    creation_time: Date;
    location?: string;
    "location-eng"?: string;
    firmware?: string;
}

export interface Stream {
    index: number;
    codec_name?: string;
    codec_long_name?: string;
    profile?: string;
    codec_type: string;
    codec_tag_string: string;
    codec_tag: string;
    width?: number;
    height?: number;
    coded_width?: number;
    coded_height?: number;
    closed_captions?: number;
    has_b_frames?: number;
    sample_aspect_ratio?: string;
    display_aspect_ratio?: string;
    pix_fmt?: string;
    level?: number;
    color_range?: string;
    color_space?: string;
    color_transfer?: string;
    color_primaries?: string;
    chroma_location?: string;
    refs?: number;
    is_avc?: string;
    nal_length_size?: string;
    r_frame_rate: string;
    avg_frame_rate: string;
    time_base: string;
    start_pts?: number;
    start_time: string;
    duration_ts?: number;
    duration: string;
    bit_rate?: string;
    bits_per_raw_sample?: string;
    nb_frames: string;
    disposition?: { [key: string]: number };
    tags: StreamTags;
    codec_time_base?: string;
    sample_fmt?: string;
    sample_rate?: string;
    channels?: number;
    bits_per_sample?: number;
}

export interface StreamTags {
    creation_time: Date;
    language: string;
    handler_name: string;
    vendor_id?: string;
    encoder?: string;
    timecode?: string;
}

export interface Track {
    name: string;
    duration: number;
}
