class Solution {
public:
    void computeLPS(vector<int>& pat, vector<int>& LPS, int M) {
        int len = 0;
        int i = 1;

        while(i < M) {
            if(pat[i] == pat[len]) {
                len++;
                LPS[i] = len;
                i++;
            } else {
                if(len != 0) {
                    len = LPS[len-1];
                } else {
                    LPS[i] = 0;
                    i++;
                }
            }
        }
    }

    bool KMPSearch(vector<int> &text, vector<int>& pat) {
        int N = text.size();
        int M = pat.size();

        vector<int> LPS(M, 0);
        
        computeLPS(pat, LPS, M);

        int i = 0, j = 0;

        while(i < N) {
            if(text[i] == pat[j]) {
                i++; j++;
            }

            if(j == M) {
                return true;

            } else if(i < N && text[i] != pat[j]) {
                if(j != 0) {
                    j = LPS[j-1];
                } else {
                    i++;
                }
            }
        }

        return false;
    }

    bool isRotationPossible(vector<int>& vec1, vector<int>& vec2) {
        vector<int> text = vec2;
        text.insert(text.end(), vec2.begin(), vec2.end());
        
        if(KMPSearch(text, vec1)) return true;
        return false;
    }

    int sortableIntegers(vector<int>& nums) {
        vector<int> sorted(nums);
        // vector<int> sorted = nums;
        sort(sorted.begin(), sorted.end());

        int n = nums.size();
        int result = 0;

        for(int k = 1; k <= n; k++) {
            if(n % k != 0) continue;
            
            bool isKValid = true;

            for(int st = 0; st < n; st += k) {
                vector<int> vec1(begin(nums) + st, begin(nums) + st + k);
                vector<int> vec2(begin(sorted) + st, begin(sorted) + st + k);
                
                if(!isRotationPossible(vec1, vec2)) {
                    isKValid = false;
                    break;
                }
            }

            if(isKValid) {
                result += k;
            }
        }

        return result;
    }
};