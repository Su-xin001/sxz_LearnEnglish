---
title: "From Headsets to Hearing Aids"
date: 2026年2月26日
tags: [saved]
source: "IEEE Spectrum"
link: https://spectrum.ieee.org/bluetooth-low-energy-audio
author: ""
feedTitle: "IEEE Spectrum"
guid: "https://spectrum.ieee.org/bluetooth-low-energy-audio"
---

# From Headsets to Hearing Aids

_This is a sponsored article brought to you by [Audio Precision](https://www.ap.com/?utm_source=ieee&utm_medium=sponsored_article&utm_campaign=bt5_q12026&utm_content=byline)._

Bluetooth started as a simple wireless connection between a phone and a headset. Since its inception, it has become the invisible scaffolding for music, calls, gaming, and hearing assistance across consumer and professional devices alike. Bluetooth’s evolution to support more use cases has been driven not by a single breakthrough but by a steady accumulation of radio innovations, codecs, transport schemes, and power management strategies that together enhance the user experience with wireless audio. Today, a new architectural baseline—Bluetooth Low Energy (LE) Audio—promises low-power, high quality, and scalable audio delivery to open up the standard for an even wider range of applications \[1\]\[2\].

Evolution of Bluetooth Radio Technologies
-----------------------------------------

The original Basic Rate (BR) radio introduced with Bluetooth 1.0 in 1999 used a Gaussian frequency-shift keying (GFSK) at 1 Msym/s, hopping through 79 channels in the 2.4 GHz band with alternating transmission directions in a tight time-division duplex rhythm. The short-range robustness and reliability afforded by this technology helped gain performance at par with traditional cable-based devices.

In 2003, the Advanced Audio Distribution Profile (A2DP) arrived as the enabling standard for stereo audio streaming over Bluetooth Classic, marking the technology’s expansion beyond voice into music playback. A2DP uses the Audio/Video Distribution Transport Protocol (AVDTP) for stream management and mandates the Sub-Band Codec (SBC) as its baseline audio compression format. The SBC codec employs 4- or 8-band analysis/synthesis filter banks with adaptive bit allocation, spanning bitrates from 128 to 345 kbps for stereo content. Embedded DSP work showed how to optimize SBC implementation—Weighted Overlap Add (WOLA) filter banks, fixed-point pipelines, and real-time decoding that is audibly indistinguishable from floating point reference implementations while consuming fewer MIPS and milliwatts \[3\].

In 2004, Bluetooth 2.0 introduced Enhanced Data Rate (EDR) that moved payloads to π/4 DQPSK or 8 DPSK modulation to boost gross throughput to 2–3 Mb/s, while retaining the GFSK for packet headers. This innovation boosted stereo streaming quality and adoption during the decade.

Around 2010, Bluetooth Low Energy (BLE) 1 M PHY technology was introduced via Bluetooth 4.0. This new radio technology continued to use GFSK but tuned for low duty cycles and intermittent bursts. This fundamental difference with BR/EDR (Basic Rate/Enhanced Data Rate) led to common usage of the term “Bluetooth Classic” for Bluetooth 1.0 to distinguish it from BLE.

Isochronous Transport Architecture
----------------------------------

In late 2016, Bluetooth 5.0 introduced the LE 2M PHY, doubling the symbol rate to 2 Msym/s. For a healthy link margin, halving a packet’s airtime was found to reduce collision exposure and lower the energy delivered/bit. By 2020, Bluetooth 5.2 or Bluetooth LE Audio radically shifted the focus from continuous streaming to a transport designed explicitly around deadlines. LE (Low Energy) Audio leverages the existing LE 1M and LE 2M PHYs but carries audio over isochronous channels—slots with timing commitments. The isochronous channel architecture comes in two forms. Connected Isochronous Streams (CIS) are unicast flows whose parameters (intervals, subevents, retransmissions) can be tuned to meet frame deadlines with bounded jitter, enabling the radio to sleep predictably between bursts while the application knows precisely when a frame will arrive. A systematic review of BLE performance corroborates that output and latency in the real world are bounded as much by connection interval, event length, and retransmissions as by the raw symbol rate; under the right parameters, faster PHYs reduce radioactive time and improve energy efficiency, while coded long-range modes trade airtime for robustness in harsher channels \[1\].

Broadcast Isochronous Streams (BIS)—commercially branded as Auracast—extend that scheduling to one-to-many transmissions, enabling connectionless audio delivery to unlimited receivers \[2\]\[7\].

This difference in architecture over continuous streams requires careful selection of intervals, packetization, codec forming and appropriate models to determine parameters that meet deadlines without wasting airtime. Markov chain analyses of CIS—validated via simulation—translate developer choices (intervals, subevents, retransmission counts) into quantitative predictions for packet loss rate (PLR), backlog, delay, throughput, and average power consumption. \[7\]

The LC3 Codec Advantage
-----------------------

LE Audio’s Low Complexity Communication Codec (LC3) fundamentally shifts the bitrate-quality-complexity balance. Peer-reviewed listening tests across speech and music demonstrate that LC3 delivers superior perceived quality compared with SBC and mSBC at roughly half the bitrate; it also provides robust packet loss concealment and flexible frame sizes, including low-latency modes that make the encoding delay a smaller slice of the end‑to-end budget \[2\]. The benefits are practical: lower bitrate shrinks airtime, which reduces collision risk; shorter frames pair cleanly with CIS scheduling so deadlines are easier to meet; the codec’s computational footprint is modest enough for miniature devices \[2\].

![AP logo with blue swoosh, text reads "An Axiometrics Solutions Brand."](https://spectrum.ieee.org/media-library/ap-logo-with-blue-swoosh-text-reads-an-axiometrics-solutions-brand.png?id=63280879&width=980)Audio Precision provides high-performance audio analyzers, accessories, and applications that have helped engineers worldwide design, validate, characterize, and manufacture audio products for over 40 years.

Hearing Aids: Power-Constrained Wireless Audio
----------------------------------------------

Modern hearing devices are a complex assembly of multiple microphones, digital signal processors, and miniature power sources. Except for Completely-in-Canal (CIC) and Invisible-in-Canal (IIC) designs, which are so small they fit entirely within the ear canal, most hearing aids incorporate two or more microphones to support directional processing, beamforming, and noise reduction. Audio output is provided by a single electro-acoustic transducer. The compact form factor severely limits battery capacity, making energy efficiency critical.

Compared to Bluetooth Classic (A2DP/HFP), LE Audio improves energy efficiency through three broad mechanisms: the LC3 codec achieves equivalent perceived audio quality at significantly lower bitrates than the SBC codec used in Bluetooth Classic; the LE 1M and 2M PHYs reduce on-air time per packet relative to BR/EDR; and Connected Isochronous Streams (CIS) enable precise scheduling, allowing the radio to sleep between transmissions, whereas BR/EDR audio requires longer active radio periods.

BLE‑compliant wake‑up receivers (WuRx) monitor the air with micro/nano-watt sensitivity and trigger the main radio with packet preambles. Reported designs demonstrate sensitivity to extremely weak radio signals (down to −80 dBm), with within‑bit duty cycling that trades latency for power from hundreds of microseconds to seconds \[4\]. Sleep scheduling techniques primarily apply heuristics for periodic check‑ins, event‑driven wake-ups, clustering, and time division to stretch lifetime while meeting QoS targets \[5\]\[6\].

From True Wireless Stereo to Coordinated Sets
---------------------------------------------

Bluetooth Classic’s A2DP supports only a single audio stream. In Bluetooth Classic’s True Wireless Stereo (TWS) devices, one earbud acts as the primary, receiving the stereo stream from the phone and relaying audio to the secondary earbud—a forwarding or relay architecture. The additional transmission hop adds latency to the secondary earbud, while increasing power consumption in the primary.

LE Audio eliminates this limitation entirely. The technology’s dual CIS capability lets the phone send synchronized left and right streams directly to both earbuds. This architectural shift enables independent CIS connections from the phone to the left and right earbuds or hearing aids, enabling synchronized stereo delivery without relaying.

Discovery and pairing have evolved to match multi‑device use. The Coordinated Set Identification Service (CSIS) allows two earbuds—or two hearing aids—to be discovered and managed as a coordinated set rather than independently, with resolvable identifiers and set‑level locks. While peer‑reviewed empirical literature on CSIS is thin, timing and carrier synchronization theory is mature: clock‑offset estimation, jitter control, phase‑locked loops, buffer alignment, and recovery strategies hold binaural timing within tens of milliseconds for lip‑sync and spatial imaging \[9\].

Gaming Headsets: Low Latency With Bidirectional Stereo
------------------------------------------------------

Gaming represents a demanding stress test for wireless audio. Bluetooth Classic’s Headset Profile (HSP) and Hands-Free Profile (HFP) support bidirectional audio for voice communication but are fundamentally limited: they transmit only in mono with a maximum sampling rate of 16 kHz, restricting both spatial audio quality and voice fidelity.

LE Audio Unicast Voice transforms this scenario by supporting stereo audio with sampling rates up to 32 kHz, significantly improving spatial audio and speech quality for gaming while maintaining voice communication with other players. End‑to‑end latency often must stay under a few tens of milliseconds for responsive play and coherent spatial sound. LC3’s shorter frames and lower bitrates shrink codec delay; tuned CIS parameters preserve deadlines while limiting retransmissions to useful values; beamforming improves capture quality for bidirectional voice without ballooning computational cost \[2\]\[7\].

![Close-up of smartphone screen showing Bluetooth icon in blue with other icons around it.](https://spectrum.ieee.org/media-library/close-up-of-smartphone-screen-showing-bluetooth-icon-in-blue-with-other-icons-around-it.png?id=63280594&width=980) Audio Precision’s new Bluetooth® 5 module provides an interface to audio devices using the latest version of the Bluetooth specification, including LE Audio devices utilizing Unicast and Auracast™. Adobe Stock

Public Broadcast Audio: Auracast
--------------------------------

Bluetooth Classic supports only one active audio connection and typically provides a range of approximately 10 meters, making it fundamentally unsuitable for broadcast scenarios such as lecture halls, churches, gyms, and airports.

LE Audio introduces the Broadcast Isochronous Stream (BIS), commercially branded as Auracast, enabling true one-to-many audio transmission. Multiple hearing aids, headphones, and earbuds can receive the same broadcast, which may be public (e.g., airport announcements) or private (encrypted, non-discoverable, optional password protection). Typical Auracast ranges extend up to 30 meters indoors and 100 meters outdoors, depending on environment and configuration.

BIS’s connectionless nature scales easily to unlimited receivers without pairing overhead; isochronous delivery tolerates packet loss well through forward error correction and interleaving; and the unidirectional transmission eliminates return traffic, reducing radio congestion. Assistive listening studies report that bypassing room acoustics and delivering audio directly can improve signal‑to‑noise ratios by 15–20 dB, making announcements comprehensible and lectures clearer \[8\].

Ensuring It Sounds Good in, on or Over the Listener’s Ear
---------------------------------------------------------

LE Audio delivers the music or voice signal more efficiently than its predecessor, Bluetooth Classic. Audio engineers still need to verify their devices’ audio performance as experienced by the end user.

The listener’s pinna, the external part of the ear, and ear canal are a critical part of the playback system. For example, the low-frequency response and the effectiveness of active noise-cancellation are highly dependent on the seal between the device and the listener’s ear canal. Similarly, on-ear and over-ear headphones interact with the listener’s pinnas.

Anthropomorphic test fixtures—most notably [GRAS KEMAR](https://www.grasacoustics.com/products/head-torso-simulators-kemar?utm_source=ieee&utm_medium=sponsored_article&utm_campaign=bt5_q12026&utm_content=kemar) (Knowles Electronics Manikin for Acoustic Research) head and torso simulators—incorporate soft, deformable anthropomorphic pinnas that replicate realistic insertion and sealing conditions. These allow accurate replication of insertion depth, sealing, low-frequency response, and ANC performance \[10\]\[12\].

Gaming headsets both receive and send audio. Just like music headphones, gaming headset testing benefits from fixtures with a human-like pinna to ensure repeatable measurement of ear-pad interaction. The headset’s microphone can be either a traditional boom microphone positioned close to the mouth or an array of microphones located farther away on the ear cups incorporating beamforming to isolate the wearer’s voice from any background noise. Test fixtures use an artificial mouth and a microphone positioned at the Mouth Reference Point (MRP) according to ITU-T standards to evaluate microphone performance under realistic speech and background noise conditions \[10\].

For testing of devices intended as broadcast receivers, an integrated test system with Auracast broadcast capability—like the [Audio Precision Bluetooth 5 module](https://www.ap.com/analyzers-accessories/interfaces-modules/bluetooth-5-le-audio-module?utm_source=ieee&utm_medium=sponsored_article&utm_campaign=bt5_q12026&utm_content=bt5_module_1)—proves invaluable.

Conclusion
----------

Bluetooth audio is no longer defined by a single radio or a single profile. It is defined by a timed pipeline—a codec that makes better sound with fewer bits, a transport that guarantees when those bits arrive, a radio that can sleep most of the time, and front‑end processing that gives the codec an easier job.

Hearing aids illustrate the payoff: arrays and beamformers improve intelligibility first; LC3 compresses with low delay; CIS schedules delivery; the radio sleeps; batteries last. Enhancements in other applications, such as gaming and public broadcast, further strengthen the case for adoption of this cutting-edge technology.

While Bluetooth audio began as a low-bandwidth, mono voice technology over Basic Rate (BR) radio in 1999, more than 25 years of evolution has produced a fundamental architectural shift. LE Audio replaces continuous point-to-point streams with scheduled, low-power, scalable audio delivery, enabling new classes of devices and use cases. The standards are ready, and audio test systems like [Audio Precision’s Bluetooth 5 module](https://www.ap.com/analyzers-accessories/interfaces-modules/bluetooth-5-le-audio-module?utm_source=ieee&utm_medium=sponsored_article&utm_campaign=bt5_q12026&utm_content=bt5_module_2) are updated to incorporate the new transmission technology; the rest is execution—deploying LE Audio broadly so audio becomes instant, clear, and inclusive \[2\]\[7\].

### References

\[1\] Tosi, J., Taffoni, F., Santacatterina, M., Sannino, R., & Formica, D. (2017). Performance evaluation of Bluetooth Low Energy: A systematic review. _Sensors_, _17_(12), Article 2898. [https://doi.org/10.3390/s17122898](https://doi.org/10.3390/s17122898)

\[2\] Schnell, M., Riedl, M., Löllmann, H., & Multrus, M. (2021). LC3 and LC3plus: The new audio transmission standards for wireless communication. _Proceedings of the AES 150th Convention_, Online.

\[3\] Hermann, D., Herre, J., & Teichmann, R. (2004). Low-power implementation of the Bluetooth subband audio codec. _Proceedings of the IEEE International Conference on Acoustics, Speech, and Signal Processing (ICASSP)_, Montreal, QC, Canada.

\[4\] Abdelhamid, M. R., Chen, R., Cho, J., Chandrakasan, A. P., & Wentzloff, D. D. (2018). A −80 dBm BLE-compliant, FSK wake-up receiver with system and within-bit duty-cycling for scalable power and latency. _Proceedings of the IEEE Custom Integrated Circuits Conference (CICC)_, San Diego, CA, USA.

\[5\] Mutar, M. S., Mohammed, A. H., & Abdulkareem, M. B. (2024). A survey of sleep scheduling techniques in wireless sensor networks for maximizing energy efficiency. _AIP Conference Proceedings_.

\[6\] Mikhaylov, K., & Karvonen, H. (2020). Wake-up radio enabled BLE wearables: Empirical and analytical evaluation of energy efficiency. _Proceedings of the IEEE International Symposium on Medical Information and Communication Technology (ISMICT)_.

\[7\] Yan, Z., Xu, H., & Shen, Z. (2024). Modeling and analysis of the performance for CIS-based Bluetooth LE Audio \[Preprint\].

\[8\] Kaufmann, T. B., Weller, T., Stiefelhagen, R., & Adiloglu, K. (2023). Requirements for mass adoption of assistive listening technology by the general public. _arXiv_. [https://arxiv.org/abs/2303.02523](https://arxiv.org/abs/2303.02523)

\[9\] Nasir, A. A., Durrani, S., Mehrpouyan, H., Blostein, S. D., & Kennedy, R. A. (2015). Timing and carrier synchronization in wireless communication systems: A survey and classification of research in the last five years. _arXiv_. [https://arxiv.org/abs/1507.02032](https://arxiv.org/abs/1507.02032)

\[10\] Okorn, E., & Wulf-Andersen, P. (2019). Acoustic test fixtures: From KEMAR and beyond! _The Journal of the Acoustical Society of America_, _146_(4), 2815. [https://doi.org/10.1121/1.5136656](https://doi.org/10.1121/1.5136656)

\[11\] An analytical model of Bluetooth performance considering physical and link-layer effects. (2021). _IEEE Xplore_.

\[12\] IEC/ITU acoustic standards literature for headphone and earbud testing. (n.d.). Indexed in _The Journal of the Acoustical Society of America_ and _AIP Conference Proceedings_.

_Disclosure: AI tools were used by Wiley, which produced this sponsored article, to skim through research literature for technical insights on the evolution and state of the art of Bluetooth technology. AI was also used to polish the text for conciseness and technical accuracy._

[Source](https://spectrum.ieee.org/bluetooth-low-energy-audio)