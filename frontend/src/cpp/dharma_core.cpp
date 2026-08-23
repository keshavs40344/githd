/**
 * DHARMA.OS C++20 Implementation File
 */
#include "dharma_dsp.hpp"
#include <iostream>

extern "C" {
    // C-ABI exports for WebAssembly Emscripten / Clang compilation
    double dharma_synthesize_bell_sample(double t) {
        static DharmaCore::PhysicalBellSynthesizer synth;
        return synth.synthesizeSample(t);
    }

    int dharma_levenshtein_distance(const char* s1, const char* s2) {
        if (!s1 || !s2) return -1;
        return DharmaCore::FastSanskritSearchEngine::calculateDistance(s1, s2);
    }
}
